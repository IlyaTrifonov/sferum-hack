import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	Snackbar
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// import Home from './panels/Home';
// import Persik from './panels/Persik';
import ListGames from './panels/ListGames';
import Card1 from './panels/Card1';

const ROUTES = {
	LIST_OF_GAMES: 'listOfGames',
	CARD1: 'card1'
}

const STORAGE_KEYS = {
	STATE: 'state',
	CARD1: 'viewStatusCard1'
}

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('listGames');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [fetchedState, setFetchedState] = useState(null);
	const [snackbar, setSnackbar] = useState(null);
	const [userHasSeenCard1, setUserHasSeenCard1] = useState(false);

	useEffect(() => {
/*
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
*/

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const sheetState = await bridge.send('VKWebAppStorageGet', {keys: [STORAGE_KEYS.STATE, STORAGE_KEYS.CARD1]});
			if (Array.isArray(sheetState.keys)) {
				const data = {};
				sheetState.keys.forEach(({key, value}) => {
					try {
						data[key] = value ? JSON.parse(value) : {};
						switch (key) {
							case STORAGE_KEYS.STATE:
								setFetchedState(data[STORAGE_KEYS.STATE]);
								break;
							case STORAGE_KEYS.CARD1:
								if (data[key] && data[key].hasSeenIntro) {
									// setActivePanel(ROUTES.HOME);
									setUserHasSeenCard1(true);
								}
								break;
							default:
								break;
						}
					} catch (error) {
						setSnackbar(<Snackbar
								layout='vertical'
								onClose={() => setSnackbar(null)}
								before={<Avatar size={24} style={{backgroundColor: 'var(--dynamic_red)'}}><Icon24Error
									fill='#fff' width={14} height={14}/></Avatar>}
								duration={900}
							>
								Проблема с получением данных из Storage
							</Snackbar>
						);
						setFetchedState({});
					}
				});

			} else {
				setFetchedState({});
			}
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								{/*<Home id='home' fetchedUser={fetchedUser} go={go} />*/}
								<ListGames id='listGames' fetchedUser={fetchedUser} go={go}/>
								<Card1 id='card1' fetchedUser={fetchedUser} go={go}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
