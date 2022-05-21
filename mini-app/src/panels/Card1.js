import React from 'react';
import PropTypes from 'prop-types';

import {Div, Group, Panel, PanelHeader, PanelHeaderBack, Text} from '@vkontakte/vkui';

const Card1 = props => (
    <Panel id={props.id}>
        <PanelHeader
            left={<PanelHeaderBack onClick={props.go} data-to="listGames"/>}
        >
            Card1
        </PanelHeader>
        <Group>
            <Div>
                <Text weight="regular">
                    Это текст
                </Text>
            </Div>
        </Group>
    </Panel>
);

Card1.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Card1;