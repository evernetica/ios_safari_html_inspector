//@ts-nocheck
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Header} from "./commonComponents/StyledHeader";
import {Block} from "./commonComponents/Block";
import {AppContextProvider} from "./commonComponents/AppContext";
import {colors} from "./colors";
import {Button} from "./commonComponents/Button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {RotatingLines} from "react-loader-spinner";

function App({productName: preselectedProductName, openOnSearch, domain}: { productName: string, openOnSearch: boolean, domain?: string }) {
    const [htmlCode, setHtmlCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectBtnBg, setSelectBtnBg] = useState(colors.black);
    const [copyBtnBg, setCopyBtnBg] = useState(colors.black);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setHtmlCode(document.documentElement.outerHTML);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const copyToClipboard = async (text) => {
        console.log('clicked copy')
        setCopyBtnBg('rgba(0, 0, 0, 0.1)');
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        } finally {
            setTimeout(() => setCopyBtnBg(colors.black), 200);
        }
    };

    const selectAllText = () => {
        console.log('clicked select');
        setSelectBtnBg('rgba(0, 0, 0, 0.1)');

        // const codeBlock = document.querySelector('pre');

        if (window.getSelection && document.createRange) {
            const selection = window.getSelection();
            selection.removeAllRanges();

            const range = document.createRange();
            // range.selectNodeContents(codeBlock);

            selection.addRange(range);
        }

        setTimeout(() => setSelectBtnBg(colors.black), 200);
    };

    // @ts-ignore
    let prevent = false;

    // @ts-ignore
    const touchstartListener = useCallback((e) => {
        if (e.target && e.target.id === 'FooterExt') {
            e.preventDefault()
        }
        if (e.touches.length !== 1) return;
    }, [])

    // @ts-ignore
    const touchmoveListener = useCallback((e) => {
        if (e.target && e.target.id === 'FooterExt') {
            console.log("here footer");
            e.preventDefault()
        }
        if (prevent) {
            e.preventDefault();
        }
    }, [])

    const preventPullToRefresh = () => {
        const appWindow = document.getElementById('react-chrome-app');
        appWindow && appWindow.addEventListener('touchstart', touchstartListener, {passive: false});
        appWindow && appWindow.addEventListener('touchmove', touchmoveListener, {passive: false});
        appWindow && appWindow.addEventListener('touchend', () => {
            prevent = false;
        });
    }

    useEffect(() => {
        const appWindow = document.getElementById('react-chrome-app');
        appWindow && appWindow.removeEventListener('touchstart', touchstartListener, true);
        appWindow && appWindow.removeEventListener('touchmove', touchmoveListener, true);

        appWindow && appWindow.removeEventListener('touchend', () => {
            prevent = false;
        }, true);
        preventPullToRefresh()

        const closeAppWindow = () => {
            const appWindow = document.getElementById('react-chrome-app');
            const appOverlay = document.getElementById('reactOverlay');
            document.body.style.position = '';
            document.body.style.top = ``;
            document.body.style.width = '';
            appWindow && appWindow.removeEventListener('touchmove', touchmoveListener, true);
            appWindow && appWindow.removeEventListener('touchstart', touchstartListener, true);

            if (appOverlay) {
                appOverlay.remove();
            }
            if (appWindow) {
                appWindow.remove();
            }
        };
        const handleOrientationChange = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            const angle = window.screen.orientation ? window.screen.orientation.angle : 0;

            if (angle !== 0 || isLandscape) {
                closeAppWindow();
            }
        };

        // Add event listener for orientation change
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);


        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleOrientationChange);
            appWindow && appWindow.removeEventListener('touchstart', touchstartListener, true);
            appWindow && appWindow.removeEventListener('touchmove', touchmoveListener, true);
        }
    }, [])

    useEffect(() => {
        const closeAppWindow = () => {
            const appWindow = document.getElementById('react-chrome-app');
            const appOverlay = document.getElementById('reactOverlay');
            document.body.style.position = '';
            document.body.style.top = ``;
            document.body.style.width = '';
            appWindow && appWindow.removeEventListener('touchmove', touchmoveListener, true);
            appWindow && appWindow.removeEventListener('touchstart', touchstartListener, true);

            if (appOverlay) {
                appOverlay.remove();
            }
            if (appWindow) {
                appWindow.remove();
            }
        };

        const isLandscape = window.innerWidth > window.innerHeight;
        const angle = window.screen.orientation ? window.screen.orientation.angle : 0;

        if (angle !== 0 || isLandscape) {
            closeAppWindow();
        }
    }, [window.screen.orientation ? window.screen.orientation.angle : null])

    const handleChange = () => {
        const appWindow = document.getElementById('react-chrome-app')
        const appOverlay = document.getElementById('reactOverlay')
        document.body.style.position = '';
        document.body.style.top = ``;
        document.body.style.width = '';

        appWindow && appWindow.removeEventListener('touchmove', touchmoveListener, true);
        appWindow && appWindow.removeEventListener('touchstart', touchstartListener, true);

        if (appOverlay) {
            appOverlay.remove();
        }
        if (appWindow) {
            appWindow.remove();
        }
    }

    const value = useMemo(() => ({}), [])
    return (
        // @ts-ignore
        <AppContextProvider value={value}>
            <Block id={'reactOpenApp'}>
                <Header
                    height={'55px'}
                    borderRadius={'20px 20px 0 0'}
                    bg={colors.black}
                    borderBottom={'1px solid #c2c2c2'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    paddingHorizontal={'20px'}
                    position={'fixed'}
                    zIndex={999999}
                    width={'100vw'}
                >
                    <p  ref={(el) => el?.style.setProperty('font-family', 'Helvetica', 'important')}
                        style={{
                        WebkitTextFillColor: '#fff',
                        fontWeight: 700,
                        marginBottom: 0,
                        marginTop: 0,
                        marginLeft: '30px',
                        fontFamily: 'Helvetica',
                        fontSize: '20px',
                    }}>HTMLSnapshot</p>
                    <Block mr={'20px'} onClick={handleChange}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                                fill="#ffffff"/>
                        </svg>
                    </Block>
                </Header>
                <Block
                    height={'76vh'}
                    borderTop={'1px solid #c2c2c2'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={"100vw"}
                    mt={'51px'}
                    bg={'white'}
                    id={'FooterExt'}
                >
                    <Block
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}

                    >
                        {isLoading ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: 'calc(100% - 30px)',
                                height: 'calc(81vh - 100px)',
                            }}>
                                <RotatingLines
                                    strokeColor="black"
                                    strokeWidth="5"
                                    animationDuration="1"
                                    width="20"
                                    visible={true}
                                />
                                <p>Please wait until code appears. It can take up to 30 seconds.</p>
                            </div>
                        ) : (<div
                            style={{
                                backgroundColor: '#FDF6E3',
                                color: '#586E75',
                                position: 'static',
                                lineHeight: '18px',
                                width: 'calc(100% - 10px)',
                                height: 'calc(80vh - 100px)',
                                margin: '0 16px',
                                marginBottom: '10px',
                                padding: '8px',
                                boxSizing: 'border-box',
                                fontFamily: 'monospace',
                                fontSize: '16px',
                                outline: 'none',
                                borderRadius: '10px',
                                overflow: 'auto',
                            }}
                        >
                            <SyntaxHighlighter language="html" customStyle={{ background: 'none', fontSize: '16px', fontFamily: 'monospace', overflow: 'auto' }}>
                                {htmlCode}
                            </SyntaxHighlighter>
                        </div>)}

                        <Block>
                            <Button borderRadius={'10px'} bg={selectBtnBg} onClick={selectAllText}>
                                <p style={{
                                    WebkitTextFillColor: colors.white,
                                    margin: '8px',
                                }}>Select All</p>
                            </Button>
                            <Button borderRadius={'10px'} bg={copyBtnBg} onClick={() => copyToClipboard(htmlCode)}>
                                <p style={{
                                    WebkitTextFillColor: colors.white,
                                    margin: '8px',
                                }}>Copy</p>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </AppContextProvider>
    );
}
export default App;
