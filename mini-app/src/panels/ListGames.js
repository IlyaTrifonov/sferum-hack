import React from 'react';
import PropTypes from 'prop-types';

import {
    Panel,
    PanelHeader,
    Header,
    Button,
    Group,
    Cell,
    Div,
    Avatar,
    CardGrid,
    ContentCard,
    PanelHeaderBack
} from '@vkontakte/vkui';

import card1 from '../img/card1.png';
import card2 from '../img/card2.png';
import card3 from '../img/card3.png';
import card4 from '../img/card4.png';
import card5 from '../img/card5.png';
import card6 from '../img/card6.png';

const ListGames = ({id, go, fetchedUser}) => (
    <Panel id={id}>
        <PanelHeader
            left={<PanelHeaderBack onClick={() => {
            }}/>}>
            Мои игры
        </PanelHeader>

        {/*
        {fetchedUser &&
            <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                </Cell>
            </Group>}
*/}


        <Group>
            <CardGrid size="s">
                <ContentCard
                    onClick={() => {
                        console.log("Кнопка нажата")
                    }}
                    src={card1}
                    header="Насекомые"
                    text="Задание на тему «Эукариоты»"
                    caption="5 раундов"
                    maxHeight={123}
                />
                <ContentCard
                    onClick={() => {
                    }}
                    src={card2}
                    header="Насекомые"
                    text="Задание на тему «Эукариоты»"
                    caption="6 раундов"
                    maxHeight={123}
                />
                <ContentCard
                    onClick={() => {
                    }}
                    src={card3}
                    header="Насекомые"
                    text="Задание на тему «Эукариоты»"
                    caption="6 раундов"
                    maxHeight={123}
                />
                <ContentCard
                    onClick={() => {
                    }}
                    src={card4}
                    header="Бактерии"
                    text="Задание к уроку"
                    caption="3 раунда"
                    maxHeight={123}
                />
                <ContentCard
                    onClick={() => {
                    }}
                    src={card5}
                    header="Хищники"
                    text="Найди пару каждому хищнику"
                    caption="5 раундов"
                    maxHeight={123}
                />
                <ContentCard
                    onClick={() => {
                    }}
                    src={card6}
                    header="Млекопитающие"
                    text="Задание к уроку 5 классов"
                    caption="10 раундов"
                    maxHeight={123}
                />
            </CardGrid>
        </Group>
        <Div>
            {/*onClick={go} data-to="persik"*/}
            <Button stretched size="l">
                Сбросить прогресс
            </Button>
        </Div>
    </Panel>
);

ListGames.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default ListGames;
