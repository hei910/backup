import {
    ILiveSportState,
    LiveSportActionTypes,
    SportTypeEnum,
    TOGGLE_IS_CLOSE_LIVE_CENTER,
    UPDATE_ALL_BG_SR_LIVESTREAM_API,
    UPDATE_LIVE_SCORE,
    UPDATE_MATCH_ID,
} from './types';

const initialState: ILiveSportState = {
    source: null,
    liveMatchId: null,
    liveSportType: null,
    jetsostaticConfig: {
        enableLiveMatch: false,
        liveMatchLoginRequired: false,
    },
    allBgSrLiveStreamData: {
        [SportTypeEnum.Football]: null,
        [SportTypeEnum.Basketball]: null,
        [SportTypeEnum.Tennis]: null,
        [SportTypeEnum.Baseball]: null,
    },
    isCloseLiveCenter: false,
};

// eslint-disable-next-line import/no-unused-modules
export default (state = initialState, action: LiveSportActionTypes): ILiveSportState => {
    switch (action.type) {
        case UPDATE_MATCH_ID:
            return {
                ...state,
                source: action.payload.source,
                liveMatchId: action.payload.liveMatchId,
                liveSportType: action.payload.liveSportType,
                fixtureId: action.payload.fixtureId,
                isCloseLiveCenter: false,
            };
        case TOGGLE_IS_CLOSE_LIVE_CENTER:
            return {
                ...state,
                isCloseLiveCenter: !state.isCloseLiveCenter,
            };
        case UPDATE_ALL_BG_SR_LIVESTREAM_API:
            if (action.payload.sportType && action.payload.data && Array.isArray(action.payload.data)) {
                return {
                    ...state,
                    allBgSrLiveStreamData: {
                        ...state.allBgSrLiveStreamData,
                        [action.payload.sportType]: action.payload.data,
                    },
                };
            }
            return state;
        case UPDATE_LIVE_SCORE:
            return {
                ...state,
                liveScoreInfo: {
                    ...state.liveScoreInfo,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
