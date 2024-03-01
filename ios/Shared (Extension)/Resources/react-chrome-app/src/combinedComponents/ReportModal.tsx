//@ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Block} from "../commonComponents/Block";
import {useAppContext} from "../commonComponents/AppContext";
import axios from "axios";
import {refreshTokenData} from "./../helpers/refreshTokenData";
import ConfirmModal from "../combinedComponents/ConfirmModal";
import {BASE_URL} from "../helpers/config";
import {ReportButton} from "../combinedComponents/ReportButton";


const ReportModal = () => {
    const {
        setIsReportModalOpen,
        isYourMessage,
        reportModalType,
        reportModalData,
        setReportModalType,
        authToken,
        refreshToken,
        setAuthToken,
        comments,
        setComments,
        setRefreshToken,
        setConfirmModalOpen,
        confirmModalOpen,
        isYourPurchase,
        setSelectedOrder,
        setSelectedPage,
        setIsEditPurchase,
        orders,
        setOrders,
        selectedPage,
        prevPage,
        setIsLoggedOut,
        setForceReloadProduct,
        emails,
        setEmails
    } = useAppContext()
    const [isClickedReport, setIsClickedReport] = useState(false);
    const [isClickedEdit, setIsClickedEdit] = useState(false);
    const [isClickedDelete, setIsClickedDelete] = useState(false);
    const textAreaRef = useRef(null);
    const postButtonRef = useRef(null);
    const [newComment, setNewComment] = useState('');
    const [isPostingComment, setIsPostingComment] = useState(false);

    const postComment = async (token, refreshedToken) => {
        try {
            if (token) {
                setAuthToken(token)
                setRefreshToken(refreshedToken)
            }
            if (newComment.trim() !== '' && !isPostingComment) {
                setIsPostingComment(true);
                console.log("postComment");
                const res = await axios({
                    method: 'patch',
                    url: `${BASE_URL}/comments/${reportModalData?.id}`,
                    headers: {Authorization: `Bearer ${token ? token : authToken}`},
                    data: {text: newComment},
                })
                if (res.status === 200) {
                    const newCommentsArray = [...comments]
                    newCommentsArray.forEach((commentFromArray) => {
                        if (commentFromArray?.id === reportModalData?.id) {
                            commentFromArray.text = newComment
                            commentFromArray.isEdited = true
                        }
                    })
                    setComments(newCommentsArray)
                }
            }
        } catch (e) {
            console.log(JSON.parse(JSON.stringify('e')));
            console.log(e);
            if (JSON.parse(JSON.stringify(e)).status === 401) {
                try {
                    await refreshTokenData({
                        refreshToken,
                        callbackFn: postComment,
                        handleError: setIsLoggedOut
                    })
                } catch (e) {
                    setIsLoggedOut(true)
                    console.log(JSON.parse(JSON.stringify(e)));
                }
            }
        } finally {
            setIsPostingComment(false);
            setIsReportModalOpen(false);
        }
    };

    const deleteOrder = async (token, refreshedToken) => {
      try {
          if (token) {
              setAuthToken(token)
              setRefreshToken(refreshedToken)
          }
          await axios({
                  method: 'delete',
                  url: `${BASE_URL}/purchases/${reportModalData.id}`,
                  headers: {Authorization: `Bearer ${token ? token : authToken}`},
              })
      } catch (e) {
          if (JSON.parse(JSON.stringify(e)).status === 401) {
              try {
                  await refreshTokenData({
                      refreshToken,
                      callbackFn: deleteOrder,
                      handleError: setIsLoggedOut
                  })
              } catch (e) {
                  setIsLoggedOut(true)
                  console.log(JSON.parse(JSON.stringify(e)));
              }
          }
      }
    }

    const deleteEmail = async (token, refreshedToken) => {
        try {
            if (token) {
                setAuthToken(token)
                setRefreshToken(refreshedToken)
            }
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}/users/emails/${reportModalData?.id}`,
                headers: {Authorization: `Bearer ${token ? token : authToken}`}
            });
            console.log('res emails delete', response.data)
            if (response.data) {
                const newEmailsArray = emails.filter(email => email.id !== reportModalData?.id);
                setEmails(newEmailsArray);
            }
        } catch (e) {
            console.log(e)
            if (JSON.parse(JSON.stringify(e)).status === 401) {
                try {
                    await refreshTokenData({
                        refreshToken,
                        callbackFn: deleteEmail,
                        handleError: setIsLoggedOut
                    });
                } catch (e) {
                    setIsLoggedOut(true)
                    console.log(JSON.parse(JSON.stringify(e)));
                }
            }
        }
    }

    const deleteComment = async (token, refreshedToken) => {
        try {
            if (token) {
                setAuthToken(token)
                setRefreshToken(refreshedToken)
            }
            await axios({
                method: 'delete',
                url: `${BASE_URL}/comments/${reportModalData.id}`,
                headers: {Authorization: `Bearer ${token ? token : authToken}`},
            })
            const newCommentsArray = comments.filter(comment => comment.id !== reportModalData?.id);
            setComments(newCommentsArray);
            setForceReloadProduct(true);
        } catch (e) {
            if (JSON.parse(JSON.stringify(e)).status === 401) {
                try {
                    await refreshTokenData({
                        refreshToken,
                        callbackFn: deleteComment,
                        handleError: setIsLoggedOut
                    })
                } catch (e) {
                    setIsLoggedOut(true)
                    console.log(JSON.parse(JSON.stringify(e)));
                }
            }
        }
    }
    const handleEdit = () => {
        setIsClickedEdit(true);
        setTimeout(() => setIsClickedEdit(false), 200);
        if (reportModalType === 'comment') {
        setNewComment(reportModalData?.text)
        setReportModalType('editComment')
        }
        if (reportModalType === 'purchase') {
            setSelectedOrder(reportModalData)
            setIsEditPurchase(true)
            setSelectedPage('AddPurchases')
            setIsReportModalOpen(false)
        }
    }
    const handleDelete = () => {
        setIsClickedDelete(true);
        setTimeout(() => setIsClickedDelete(false), 200);
        setConfirmModalOpen(true)
    }
    const handleReport = () => {
        setIsClickedReport(true);
        setTimeout(() => setIsClickedReport(false), 200);
        setIsReportModalOpen(false)
    }

    const handleConfirm = (e) => {
        e.preventDefault()
        setIsReportModalOpen(false)
        setConfirmModalOpen(false)

        if (reportModalType === 'comment') {
            deleteComment()
            const newCommentsArray = comments.filter(commentFromArray =>
                commentFromArray?.id !== reportModalData?.id)
            setComments(newCommentsArray)
        }
        if (reportModalType === 'email') {
            deleteEmail()
            const newEmailsArray = emails.filter(emailFromArray => emailFromArray?.id !== reportModalData?.id);
            setEmails(newEmailsArray);
        }
        if (reportModalType === 'purchase') {
            deleteOrder()
            if (selectedPage === 'Search') {
                setSelectedPage(prevPage)
            }
            const newOrderArray = orders.filter(orderFromArray => orderFromArray?.id !== reportModalData.id)
            setOrders(newOrderArray)
        }
    }

    const handleDiscard = (e) => {
        e.preventDefault()
        setConfirmModalOpen(false)
    }
    const handleTextAreaChange = (e) => {
        const target = e.target;
        setNewComment(target.value);

        target.style.height = '30px';

        const newHeight = target.value ? `${target.scrollHeight - 20}px` : '30px';
        target.style.height = newHeight;

        if (target.value.length === 0) {
            target.style.height = '30px';
        }
    };

    const handleKeyDown = (e) => {
        const textarea = e.target;
        let text = textarea.value;

        if (e.key === 'Enter') {
            const lineBreaks = (text.match(/\n/g) || []).length;

            if (lineBreaks >= 4 - 1) {
                e.preventDefault();
                return;
            }
        }
        console.log(e.key);
        if (text.length >= 100 && e.key !== 'Backspace') {
            e.preventDefault();
            return;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modalElement = document.getElementById('ReportBlock');
            if (modalElement && !modalElement.contains(event.target)) {
                setIsReportModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Block id={'ReportBlock'} position={'absolute'} zIndex={999999999} bottom={'0'} right={'0'} width={'100%'} height={'40%'}
               bg={'white'} borderRadius={'20px 20px 0 0'} borderTopStyle={'solid'} borderTopWidth={'1px'}
               borderTopColor={'#000'} webkitBoxShadow={"true"}>
            <Block position={'absolute'} top={'10px'} right={'10px'} onClick={() => setIsReportModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                        fill="#1A1B27"/>
                </svg>
            </Block>
            {
                reportModalType === 'editComment' ?
                    <>
                        <Block mt={'15px'} ml={'10px'}>
                            <p  ref={(el) => el?.style.setProperty('font-family', 'Inter', 'important')}
                                style={{
                                WebkitTextFillColor: '#000',
                                lineHeight: '15px',
                                fontWeight: 400,
                                marginBottom: 0,
                                marginTop: 0,
                                marginLeft: 5,
                                fontFamily: 'Inter',
                                fontSize: '14px',
                            }}>Edit</p>
                        </Block>
                        <Block
                            position={'relative'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'flex-end'}
                            mb={'40px'}
                            width={'95%'}
                            mt={'10px'}
                            mr={'auto'}
                            ml={'auto'}
                            border={'1px solid #000'}
                            borderRadius={'20px'}
                            style={{
                                overflow: 'hidden',
                                zIndex: 100,
                            }}
                        >
                            <textarea
                                ref={(textAreaRef) => textAreaRef?.style.setProperty('font-family', 'Inter', 'important')}
                                type="text"
                                value={newComment}
                                onChange={handleTextAreaChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Write a comment..."
                                maxLength={100}
                                style={{
                                    width: '100%',
                                    padding: '15px 80px 5px 10px',
                                    resize: 'none',
                                    overflowY: 'auto',
                                    height: '30px',
                                    minHeight: '30px',
                                    fontSize: 16,
                                    fontFamily: 'Inter',
                                    outline: 'none',
                                    border: 'none',
                                    boxSizing: 'content-box'
                                }}
                            />
                            <Block
                                ref={(postButtonRef) => postButtonRef?.style.setProperty('font-family', 'Inter', 'important')}
                                onClick={!isPostingComment ? postComment : null}
                                style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '20px',
                                    fontFamily: 'Inter',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: newComment.trim() && !isPostingComment ? '#0E0BB6' : '#C0C0C0',
                                    cursor: newComment.trim() && !isPostingComment ? 'pointer' : 'default',
                                }}
                            >
                                Post
                            </Block>
                        </Block>
                    </> : null
            }
            {reportModalType === 'comment' ?
                isYourMessage ?
                    <>
                        <ReportButton title={'Edit Message'} mt={'30px'} handler={handleEdit} isClicked={isClickedEdit} />
                        <ReportButton title={'Delete Message'} mt={'10px'} handler={handleDelete} isClicked={isClickedDelete} />
                    </> :
                    <ReportButton title={'Report Message'} mt={'30px'} handler={handleReport} isClicked={isClickedReport} /> : null
            }
            {reportModalType === 'purchase' ?
                isYourPurchase ?
                    <>
                        <ReportButton title={'Edit Purchase'} mt={'30px'} handler={handleEdit} isClicked={isClickedEdit} />
                        <ReportButton title={'Delete Purchase'} mt={'10px'} handler={handleDelete} isClicked={isClickedDelete} />
                    </>
                    :
                    <ReportButton title={'Report Purchase'} mt={'30px'} handler={handleReport} isClicked={isClickedReport} />
                : null
            }
            {reportModalType === 'email' ?
                <ReportButton title={'Delete Email'} mt={'30px'} handler={handleDelete} isClicked={isClickedDelete} />
                : null
            }
            {confirmModalOpen ? <ConfirmModal confirmHandler={handleConfirm} rejectHandler={handleDiscard}/> : null}
        </Block>
    )
}

export default ReportModal;
