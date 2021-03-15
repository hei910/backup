// Essential for all components
import React from 'react';
import styled from 'styled-components/macro';

// Interface
interface DemoProps {}

interface HomePageContent {
    image: string;
    title: string;
    path: string;
}

// Styled Container
const MobileMainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    margin: 2.5vh 2vw 3vh 2vw;
`;

const HomeMenu = styled.div`
    width: 29%;
    margin: 0 2px 0 2px;

    img {
        width: 100%;
    }
`;

const Demo: React.FC<DemoProps> = props => {
    const homePageContent: HomePageContent[] = [
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_sport.jpg',
            title: '体育赛事',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_live.jpg',
            title: '真人荷官',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_casino.jpg',
            title: '老虎机',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_lottery.jpg',
            title: '彩票PK10',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/fish_hunter/fishhunter-thumbnail.jpg',
            title: '捕鱼游戏',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_apps.jpg',
            title: 'APP下载',
            path: '/',
        },
        {
            image: 'https://statica1.yonghuai5515.com/brand/mobile/main/img/btn_friendships.jpg',
            title: '分享赚钱',
            path: '/',
        },
    ];

    return (
        <MobileMainContainer>
            <HomeContainer>
                {homePageContent.map(content => (
                    // <Link className="content-button" to={content.path}>
                    //     <img src={content.image} alt="" />
                    //     <div>{content.title}</div>
                    // </Link>
                    <HomeMenu>
                        <a href={content.path}>
                            <img src={content.image} alt="" />
                            <div>{content.title}</div>
                        </a>
                    </HomeMenu>
                ))}
            </HomeContainer>
        </MobileMainContainer>
    );
};

export default Demo;
