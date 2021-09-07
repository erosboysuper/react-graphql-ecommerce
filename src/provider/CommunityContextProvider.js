import React, { useState, useEffect, useContext } from 'react'

import { optimalImage, obj2QryStr } from '~//utils/functions'
import Context from '~/context/CommunityContext'
import StoreContext from '~/context/StoreContext'

let autoLoginPopupHandle = null
const CommunityContextProvider = ({ children }) => {
  const [mainTab, setMainTab] = useState('community')
  const [seeMore, setSeeMore] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  const [forgotModal, setForgotModal] = useState(false)
  const [createRoomModal, setCreateRoomModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)
  const [roomsData, setRoomsData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [allTopics, setAllTopics] = useState([])
  const [roomTopics, setRoomTopics] = useState([])
  const [signUpStepNum, setSignUpStepNum] = useState(0)
  const [totalSignUpSteps, setTotalSignUpSteps] = useState(0)
  const [onboardingQuestions, setOnboardingQuestions] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [userHeaders, setUserHeaders] = useState({})
  const [searchModal, setSearchModal] = useState(false)
  const [allRoomModal, setAllRoomModal] = useState(false)
  const [lightboxModal, setLightboxModal] = useState(false)
  const [lightboxAsset, setLightboxAsset] = useState([])
  const [editModal, setEditModal] = useState(false)
  const [editRecord, setEditRecord] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [newTopicModal, setNewTopicModal] = useState(false)
  const [newConversationModal, setNewConversationModal] = useState(false)
  const [newMediaUploadModal, setNewMediaUploadModal] = useState(false)
  const [cameraModal, setCameraModal] = useState(false)
  const [recordModal, setRecordModal] = useState(false)
  const [editCommentModal, setEditCommentModal] = useState(false)
  const [profileInfo, setProfileInfo] = useState(null)
  const [editAddressModal, setEditAddressModal] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [inviteFriendModal, setInviteFriendModal] = useState(false)
  const [coCreationModal, setCoCreationModal] = useState(false)
  const [startLiveModal, setStartLiveModal] = useState(false)
  const [scheduleLiveModal, setScheduleLiveModal] = useState(false)
  const [coCreationToolModal, setCoCreationToolModal] = useState(false)
  const [quickLink, setQuickLink] = useState(false)
  const [userProfiles, setUserProfiles] = useState({})
  const [filters, setFilters] = useState({
    category: 0,
    sortBy: 'most_recent',
  })
  const [scheduleDetail, setScheduleDetail] = useState(null)
  const [mobileSchedule, setMobileSchedule] = useState(false)
  const { setLoader } = useContext(StoreContext)

  useEffect(() => {
    if (userInfo) {
      if (!userHeaders.Authorization) {
        setUserHeaders(prevState => {
          return {
            ...prevState,
            Authorization: `Bearer ${userInfo.jwt}`,
          }
        })
        getNotifications()
      }

      localStorage.setItem(`userInfo`, JSON.stringify(userInfo))
    } else {
      let _userInfo = localStorage.getItem(`userInfo`)
      if (_userInfo) {
        _userInfo = JSON.parse(_userInfo)
        setUserInfo(_userInfo)
      }
    }
  }, [userInfo])

  const voteUpTopic = id => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve(false)
      } else {
        if (
          userInfo.user.topic_voted[id] &&
          userInfo.user.topic_voted[id] === 'dislike'
        ) {
          resolve(false)
        }
        // REMOVE TOPIC LIKE - API CALL //
        else if (
          userInfo.user.topic_voted[id] &&
          userInfo.user.topic_voted[id] === 'like'
        ) {
          topicLike(id, 0, 'likes').then(res => {
            resolve(res)
          })
        }
        // ADD TOPIC LIKE - API CALL //
        else {
          topicLike(id, 1, 'likes').then(res => {
            resolve(res)
          })
        }
      }
    })
  }

  const voteDownTopic = id => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve(false)
      } else {
        if (
          userInfo.user.topic_voted[id] &&
          userInfo.user.topic_voted[id] === 'like'
        ) {
          resolve(false)
        }
        // REMOVE TOPIC DISLIKE - API CALL //
        else if (
          userInfo.user.topic_voted[id] &&
          userInfo.user.topic_voted[id] === 'dislike'
        ) {
          topicDislike(id, 0, 'dislikes').then(res => {
            resolve(res)
          })
        }
        // ADD TOPIC DISLIKE - API CALL //
        else {
          topicDislike(id, 1, 'dislikes').then(res => {
            resolve(res)
          })
        }
      }
    })
  }

  const followingTopic = id => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve(false)
      } else {
        const indx = userInfo.user.following_topics.indexOf(id)
        // REMOVE TOPIC FOLLOW - API CALL //
        if (indx !== -1) {
          topicFollow(id, 0, 'followers').then(res => {
            resolve(res)
          })
        }
        // ADD TOPIC FOLLOW - API CALL //
        else {
          topicFollow(id, 1, 'followers').then(res => {
            resolve(res)
          })
        }
      }
    })
  }

  const voteUpComment = (topic_id, id) => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve(false)
      } else {
        if (
          userInfo.user.comment_voted[id] &&
          userInfo.user.comment_voted[id] === 'dislike'
        ) {
          resolve(false)
        }
        // REMOVE COMMENT LIKE - API CALL //
        else if (
          userInfo.user.comment_voted[id] &&
          userInfo.user.comment_voted[id] === 'like'
        ) {
          commentLike(topic_id, id, 0, 'likes').then(res => {
            resolve(res)
          })
        }
        // ADD COMMENT LIKE - API CALL //
        else {
          commentLike(topic_id, id, 1, 'likes').then(res => {
            resolve(res)
          })
        }
      }
    })
  }

  const voteDownComment = (topic_id, id) => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve(false)
      } else {
        if (
          userInfo.user.comment_voted[id] &&
          userInfo.user.comment_voted[id] === 'like'
        ) {
          resolve(false)
        }
        // REMOVE COMMENT DISLIKE - API CALL //
        else if (
          userInfo.user.comment_voted[id] &&
          userInfo.user.comment_voted[id] === 'dislike'
        ) {
          commentDislike(topic_id, id, 0, 'dislikes').then(res => {
            resolve(res)
          })
        }
        // ADD COMMENT DISLIKE - API CALL //
        else {
          commentDislike(topic_id, id, 1, 'dislikes').then(res => {
            resolve(res)
          })
        }
      }
    })
  }

  const createRoomControl = () => {
    if (!userInfo) {
      userLoginAction()
    } else {
      setCreateRoomModal(true)
    }
  }

  const userLoginAction = () => {
    setLoginModal(true)
  }

  const getNotifications = () => {
    fetch(`${process.env.API_BASE}/userNotifications`, {
      method: 'GET',
      async: true,
      headers: {
        Authorization: `Bearer ${userInfo.jwt}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setNotifications(res || [])
      })
  }

  const userLogin = formData => {
    if (autoLoginPopupHandle) {
      clearTimeout(autoLoginPopupHandle)
    }
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/auth/local`, {
        method: 'POST',
        async: true,
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.jwt) {
            setUserInfo(res)
          }
          setLoader(false)
          resolve(res)
        })
    })
  }

  const userSignup = formData => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/auth/local/register`, {
        method: 'POST',
        async: true,
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          resolve(res)
        })
    })
  }

  const getTopTopics = params => {
    return new Promise(resolve => {
      let _userHeaders = userHeaders
      let _userInfo = localStorage.getItem(`userInfo`)
      if (!_userHeaders.Authorization && _userInfo) {
        _userInfo = JSON.parse(_userInfo)
        _userHeaders = {
          Authorization: `Bearer ${_userInfo.jwt}`,
        }
      }

      fetch(`${process.env.API_BASE}/topTopics?${obj2QryStr(params)}`, {
        method: 'GET',
        async: true,
        headers: _userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          const _allTopics = res.map(t => {
            t.comments = t.comments.map(c => {
              c['topic_id'] = t.id
              return c
            })
            return t
          })
          // REMOVE DUPLICACY //
          const filteredTopics = [...allTopics, ..._allTopics].reduce(
            (acc, current) => {
              const x = acc.find(item => item.id === current.id)
              if (!x) {
                return acc.concat([current])
              } else {
                return acc
              }
            },
            []
          )
          setAllTopics(filteredTopics)
          resolve(_allTopics)
        })
    })
  }

  const getRooms = () => {
    return new Promise(resolve => {
      fetch(`${process.env.API_BASE}/roomList`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          // REMOVE DUPLICACY //
          const filteredRooms = [...roomsData, ...res].reduce(
            (acc, current) => {
              const x = acc.find(item => item.id === current.id)
              if (!x) {
                return acc.concat([current])
              } else {
                return acc
              }
            },
            []
          )
          setRoomsData(filteredRooms)
          resolve(res)
        })
    })
  }

  const getRoom = room_slug => {
    fetch(`${process.env.API_BASE}/roomList/${room_slug}`, {
      method: 'GET',
      async: true,
      headers: userHeaders,
    })
      .then(res => res.json())
      .then(res => {
        // REMOVE DUPLICACY //
        const filteredRooms = [...roomsData, ...res].reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])
        setRoomsData(filteredRooms)
      })
  }

  const getRoomTopics = (room_slug, params) => {
    return new Promise(resolve => {
      fetch(
        `${process.env.API_BASE}/topTopics/${room_slug}?${obj2QryStr(params)}`,
        {
          method: 'GET',
          async: true,
          headers: userHeaders,
        }
      )
        .then(res => res.json())
        .then(res => {
          if (res) {
            const _roomTopics = res.map(t => {
              t.comments = t.comments.map(c => {
                c['topic_id'] = t.id
                return c
              })
              return t
            })
            // ROMMY - FOR ROOM PAGE, WE ARE MANTAINING COMPONENT LEVEL STATE //
            // REMOVE DUPLICACY //
            // const filteredTopics = [...allTopics, ..._roomTopics].reduce(
            //   (acc, current) => {
            //     const x = acc.find(item => item.id === current.id)
            //     if (!x) {
            //       return acc.concat([current])
            //     } else {
            //       return acc
            //     }
            //   },
            //   []
            // )
            // setAllTopics(filteredTopics)
            resolve(_roomTopics)
          } else {
            resolve([])
          }
        })
    })
  }

  const getCategories = () => {
    fetch(`${process.env.API_BASE}/categoryList`, {
      method: 'GET',
      async: true,
      headers: userHeaders,
    })
      .then(res => res.json())
      .then(res => {
        let _categoryData = res || []
        _categoryData.unshift({
          id: 0,
          title: 'All Categories',
          images: [],
        })
        setCategoryData(_categoryData)
      })
  }

  const topicLike = (id, status, field) => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/topicLike/${id}/${status}`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          let topic = {}
          if (res.success) {
            // UDPATE TOPIC ARRAY //
            let _allTopics = [...allTopics]
            topic = _allTopics.find(x => x.id === id)
            if (topic && field) {
              topic[field] = status === 0 ? topic[field] - 1 : topic[field] + 1
              setAllTopics(_allTopics)
            }

            // UPDATE USER CACHE //
            let _topic_voted = { ...userInfo.user.topic_voted }
            if (_topic_voted[id] && status === 0) {
              delete _topic_voted[id]
            } else if (!_topic_voted[id] && status === 1) {
              _topic_voted[id] = 'like'
            }
            setUserInfo(prevState => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  topic_voted: _topic_voted,
                },
              }
            })
          }
          resolve(topic)
        })
    })
  }

  const topicDislike = (id, status, field) => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/topicDislike/${id}/${status}`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          let topic = {}
          if (res.success) {
            // UDPATE TOPIC ARRAY //
            let _allTopics = [...allTopics]
            topic = _allTopics.find(x => x.id === id)
            if (topic && field) {
              topic[field] = status === 0 ? topic[field] - 1 : topic[field] + 1
              setAllTopics(_allTopics)
            }

            // UPDATE USER CACHE //
            let _topic_voted = { ...userInfo.user.topic_voted }
            if (_topic_voted[id] && status === 0) {
              delete _topic_voted[id]
            } else if (!_topic_voted[id] && status === 1) {
              _topic_voted[id] = 'dislike'
            }
            setUserInfo(prevState => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  topic_voted: _topic_voted,
                },
              }
            })
          }
          resolve(topic)
        })
    })
  }

  const topicFollow = (id, status, field) => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/topicFollow/${id}/${status}`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          let topic = {}
          if (res.success) {
            // UDPATE TOPIC ARRAY //
            let _allTopics = [...allTopics]
            topic = _allTopics.find(x => x.id === id)
            if (topic && field) {
              topic[field] = status === 0 ? topic[field] - 1 : topic[field] + 1
              setAllTopics(_allTopics)
            }

            // UPDATE USER CACHE //
            let _following_topics = [...userInfo.user.following_topics]
            const indx = _following_topics.indexOf(id)
            if (status === 0 && indx !== -1) {
              _following_topics.splice(0, 1)
            } else if (status === 1 && indx === -1) {
              _following_topics.push(id)
            }
            setUserInfo(prevState => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  following_topics: _following_topics,
                },
              }
            })
          }
          resolve(topic)
        })
    })
  }

  const commentLike = (topic_id, id, status, field) => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/commentLike/${id}/${status}`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          let comment = {}
          if (res.success) {
            // UDPATE TOPIC ARRAY //
            let _allTopics = [...allTopics]
            let topic = _allTopics.find(x => x.id === topic_id)
            comment = topic.comments.find(x => x.id === id)
            if (comment && field) {
              comment[field] =
                status === 0 ? comment[field] - 1 : comment[field] + 1
              setAllTopics(_allTopics)
            }

            // UPDATE USER CACHE //
            let _comment_voted = { ...userInfo.user.comment_voted }
            if (_comment_voted[id] && status === 0) {
              delete _comment_voted[id]
            } else if (!_comment_voted[id] && status === 1) {
              _comment_voted[id] = 'like'
            }
            setUserInfo(prevState => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  comment_voted: _comment_voted,
                },
              }
            })
          }
          resolve(comment)
        })
    })
  }

  const commentDislike = (topic_id, id, status, field) => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/commentDislike/${id}/${status}`, {
        method: 'GET',
        async: true,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          let comment = {}
          if (res.success) {
            // UDPATE TOPIC ARRAY //
            let _allTopics = [...allTopics]
            let topic = _allTopics.find(x => x.id === topic_id)
            comment = topic.comments.find(x => x.id === id)
            if (comment && field) {
              comment[field] =
                status === 0 ? comment[field] - 1 : comment[field] + 1
              setAllTopics(_allTopics)
            }

            // UPDATE USER CACHE //
            let _comment_voted = { ...userInfo.user.comment_voted }
            if (_comment_voted[id] && status === 0) {
              delete _comment_voted[id]
            } else if (!_comment_voted[id] && status === 1) {
              _comment_voted[id] = 'dislike'
            }
            setUserInfo(prevState => {
              return {
                ...prevState,
                user: {
                  ...prevState.user,
                  comment_voted: _comment_voted,
                },
              }
            })
          }
          resolve(comment)
        })
    })
  }

  const createNewRoom = formData => {
    return new Promise(resolve => {
      let method = 'POST'
      let _url = `${process.env.API_BASE}/rooms`
      if (editRecord && editRecord.type === 'room') {
        method = 'PUT'
        _url = `${process.env.API_BASE}/rooms/${editRecord.id}`
      }
      setLoader(true)
      fetch(_url, {
        method: method,
        async: true,
        body: formData,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.id) {
            // UPDATE ROOM CACHE //
            let _roomsData = [...roomsData]
            // EDIT RECORD //
            if (
              editRecord &&
              editRecord.type === 'room' &&
              editRecord.action === 'edit'
            ) {
              let _room = _roomsData.find(r => r.id === editRecord.id)
              _room.title = res.title
              _room.description = res.description
              _room.slug = res.slug
              const imgSet = optimalImage(res.image)
              _room.image = imgSet.image
              _room.image_large = imgSet.image_large
              setRoomsData(_roomsData)

              // UPDATE TOPICS OF THE ROOM //
              const _allTopics = allTopics.map(topic => {
                if (topic.room.id === editRecord.id) {
                  topic.room.title = _room.title
                  topic.room.description = _room.description
                  topic.room.slug = _room.slug
                  topic.room.image = _room.image
                  topic.room.image_large = _room.image_large
                }
                return topic
              })
              setAllTopics(_allTopics)
            }
            // DELETE RECORD //
            else if (
              editRecord &&
              editRecord.type === 'room' &&
              editRecord.action === 'delete'
            ) {
              const roomIndex = _roomsData.findIndex(
                r => r.id === editRecord.id
              )
              if (roomIndex !== -1) {
                // REMOVE ROOM //
                _roomsData.splice(roomIndex, 1)
                setRoomsData(_roomsData)

                // REMOVE TOPICS OF THE ROOM //
                const _allTopics = allTopics.filter(
                  x => x.room.id !== editRecord.id
                )
                setAllTopics(_allTopics)

                // UPDATE USER CACHE //
                let rooms = [...userInfo.user.rooms]
                const userRoomIndex = rooms.indexOf(editRecord.id)
                if (userRoomIndex !== -1) {
                  rooms.splice(userRoomIndex, 1)
                }
                let owned_rooms = [...userInfo.user.owned_rooms]
                const userOwnedRoomIndex = owned_rooms.indexOf(editRecord.id)
                if (userOwnedRoomIndex !== -1) {
                  owned_rooms.splice(userOwnedRoomIndex, 1)
                }
                setUserInfo(prevState => {
                  return {
                    ...prevState,
                    user: {
                      ...prevState.user,
                      rooms: rooms,
                      owned_rooms: owned_rooms,
                    },
                  }
                })
              }
            }
            // NEW RECORD //
            else {
              const imgSet = optimalImage(res.image)
              const ownerImgSet = optimalImage(res.owner.image)
              _roomsData.push({
                id: res.id,
                type: res.type,
                title: res.title,
                slug: res.slug,
                description: res.description,
                owner: res.owner.id,
                created_at: res.created_at,
                ...imgSet,
                members: [
                  {
                    id: res.owner.id,
                    name: `${res.owner.first_name} ${res.owner.last_name}`,
                    ...ownerImgSet,
                  },
                ],
                categories: res.categories.map(c => ({
                  id: c.id,
                  title: c.title,
                })),
              })
              setRoomsData(_roomsData)

              // UPDATE USER CACHE //
              setUserInfo(prevState => {
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    owned_rooms: [...prevState.user.owned_rooms, res.id],
                    rooms: [...prevState.user.rooms, res.id],
                  },
                }
              })
            }
          }
          setLoader(false)
          resolve(res)
        })
    })
  }

  const createNewTopic = formData => {
    return new Promise(resolve => {
      let method = 'POST'
      let _url = `${process.env.API_BASE}/topics`
      if (editRecord && editRecord.type === 'topic') {
        method = 'PUT'
        _url = `${process.env.API_BASE}/topics/${editRecord.id}`
      }
      setLoader(true)
      fetch(_url, {
        method: method,
        async: true,
        body: formData,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.id) {
            // UPDATE TOPIC CACHE //
            let _allTopics = [...allTopics]
            let _roomTopics = [...roomTopics]
            // EDIT RECORD //
            if (
              editRecord &&
              editRecord.type === 'topic' &&
              editRecord.action === 'edit'
            ) {
              let _topic = _allTopics.find(t => t.id === editRecord.id)
              if (!_topic) {
                _topic = _roomTopics.find(t => t.id === editRecord.id)
              }
              _topic.title = res.title
              _topic.description = res.description
              const imgSet = optimalImage(res.image)
              _topic.image = imgSet.image
              _topic.image_large = imgSet.image_large
              setAllTopics(_allTopics)
              setRoomTopics(_roomTopics)
            }
            // DELETE RECORD //
            else if (
              editRecord &&
              editRecord.type === 'topic' &&
              editRecord.action === 'delete'
            ) {
              const topicIndex = _allTopics.findIndex(
                t => t.id === editRecord.id
              )
              const roomTopicIndex = _roomTopics.findIndex(
                t => t.id === editRecord.id
              )
              if (topicIndex !== -1 || roomTopicIndex !== -1) {
                if (topicIndex !== -1) {
                  _allTopics.splice(topicIndex, 1)
                  setAllTopics(_allTopics)
                }
                if (roomTopicIndex !== -1) {
                  _roomTopics.splice(roomTopicIndex, 1)
                  setRoomTopics(_roomTopics)
                }
                // UPDATE USER CACHE //
                let owned_topics = [...userInfo.user.owned_topics]
                const userTopicIndex = owned_topics.indexOf(editRecord.id)
                if (userTopicIndex !== -1) {
                  owned_topics.splice(userTopicIndex, 1)
                  setUserInfo(prevState => {
                    return {
                      ...prevState,
                      user: {
                        ...prevState.user,
                        owned_topics: owned_topics,
                      },
                    }
                  })
                }
              }
            }
            // NEW RECORD //
            else {
              const room = roomsData.find(x => x.id === Number(roomId))
              const imgSet = optimalImage(res.image)
              const ownerImgSet = optimalImage(res.owner.image)
              const _topicData = {
                id: res.id,
                title: res.title,
                description: res.description,
                created_at: res.created_at,
                likes: 0,
                dislikes: 0,
                followers: 0,
                commentCount: 0,
                comments: [],
                ...imgSet,
                owner: {
                  id: res.owner.id,
                  name: `${res.owner.first_name} ${res.owner.last_name}`,
                  ...ownerImgSet,
                },
                room: { ...room },
              }
              _allTopics.unshift(_topicData)
              setAllTopics(_allTopics)

              _roomTopics.unshift(_topicData)
              setRoomTopics(_roomTopics)

              // UPDATE USER CACHE //
              setUserInfo(prevState => {
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    owned_topics: [...prevState.user.owned_topics, res.id],
                  },
                }
              })
            }
          }
          setLoader(false)
          resolve(res)
        })
    })
  }

  const createNewComment = formData => {
    return new Promise(resolve => {
      let method = 'POST'
      let _url = `${process.env.API_BASE}/comments`
      if (editRecord && editRecord.type === 'comment') {
        method = 'PUT'
        _url = `${process.env.API_BASE}/comments/${editRecord.id}`
      }
      setLoader(true)
      fetch(_url, {
        method: method,
        async: true,
        body: formData,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.topic) {
            // UPDATE TOPIC WITH COMMENT CACHE //
            let _allTopics = [...allTopics]
            let _roomTopics = [...roomTopics]
            // EDIT RECORD //
            if (
              editRecord &&
              editRecord.type === 'comment' &&
              editRecord.action === 'edit'
            ) {
              let _topic = _allTopics.find(t => t.id === editRecord.topic_id)
              if (!_topic) {
                _topic = _roomTopics.find(t => t.id === editRecord.topic_id)
              }
              if (_topic) {
                let _comment = _topic.comments.find(c => c.id === editRecord.id)
                if (_comment) {
                  _comment.comment = res.comment
                  const imgSet = optimalImage(res.image)
                  _comment.image = imgSet.image
                  _comment.image_large = imgSet.image_large
                  setAllTopics(_allTopics)
                  setRoomTopics(_roomTopics)
                }
              }
            }
            // DELETE RECORD //
            else if (
              editRecord &&
              editRecord.type === 'comment' &&
              editRecord.action === 'delete'
            ) {
              let _topic = _allTopics.find(t => t.id === editRecord.topic_id)
              let _roomTopic = _roomTopics.find(
                t => t.id === editRecord.topic_id
              )
              if (_topic || _roomTopic) {
                if (_topic) {
                  let commentIndex = _topic.comments.findIndex(
                    c => c.id === editRecord.id
                  )
                  if (commentIndex !== -1) {
                    _topic.comments.splice(commentIndex, 1)
                    _topic.commentCount--
                    setAllTopics(_allTopics)
                  }
                }
                if (_roomTopic) {
                  const roomCommentIndex = _roomTopic.comments.findIndex(
                    c => c.id === editRecord.id
                  )
                  if (roomCommentIndex !== -1) {
                    _roomTopic.comments.splice(roomCommentIndex, 1)
                    _roomTopic.commentCount--
                    setRoomTopics(_roomTopics)
                  }
                }
                // UPDATE USER CACHE //
                let owned_comments = [...userInfo.user.owned_comments]
                const userCommentIndex = owned_comments.indexOf(editRecord.id)
                if (userCommentIndex !== -1) {
                  owned_comments.splice(userCommentIndex, 1)
                  setUserInfo(prevState => {
                    return {
                      ...prevState,
                      user: {
                        ...prevState.user,
                        owned_comments: owned_comments,
                      },
                    }
                  })
                }
              }
            }
            // NEW RECORD //
            else {
              // UPDATE USER CACHE //
              let _userRooms = userInfo.user.rooms
              if (res.roomMember) {
                _userRooms.push(res.roomMember)
              }
              setUserInfo(prevState => {
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    owned_comments: [...prevState.user.owned_comments, res.id],
                    rooms: [..._userRooms],
                  },
                }
              })
            }
          }
          setLoader(false)
          resolve(res)
        })
    })
  }

  const uploadFiles = formData => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/upload`, {
        method: 'POST',
        async: true,
        body: formData,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          resolve(res)
        })
    })
  }

  const joinRoomAction = room_id => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve()
      } else {
        setLoader(true)
        fetch(`${process.env.API_BASE}/joinRoom/${room_id}`, {
          method: 'GET',
          async: true,
          headers: userHeaders,
        })
          .then(res => res.json())
          .then(res => {
            if (res && res.success) {
              setUserInfo(prevState => {
                return {
                  ...prevState,
                  user: {
                    ...prevState.user,
                    rooms: [...prevState.user.rooms, room_id],
                  },
                }
              })
            }
            setLoader(false)
            resolve(res)
          })
      }
    })
  }

  const joinPrivateRoomAction = room_id => {
    return new Promise(resolve => {
      if (!userInfo) {
        userLoginAction()
        resolve()
      } else {
        setLoader(true)
        fetch(`${process.env.API_BASE}/joinPrivateRoom/${room_id}`, {
          method: 'GET',
          async: true,
          headers: userHeaders,
        })
          .then(res => res.json())
          .then(res => {
            setLoader(false)
            resolve(res)
          })
      }
    })
  }

  const saveOnboardUser = formData => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/saveOnboardUser`, {
        method: 'POST',
        async: true,
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          resolve(res)
        })
    })
  }

  const saveUserData = formData => {
    return new Promise(resolve => {
      setLoader(true)
      fetch(`${process.env.API_BASE}/saveUser`, {
        method: 'PUT',
        async: true,
        body: formData,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.id) {
            // update user cache
            setUserInfo(prevState => {
              return {
                ...prevState,
                jwt: res.jwt,
                user: {
                  ...prevState.user,
                  first_name: res.first_name,
                  last_name: res.last_name,
                  description: res.description,
                  image: res.image,
                  image_large: res.image_large,
                  wall_image: res.wall_image,
                },
              }
            })
            setUserHeaders(prevState => {
              return {
                ...prevState,
                Authorization: `Bearer ${res.jwt}`,
              }
            })
          }
          setLoader(false)
          resolve(res)
        })
    })
  }

  const userLogout = () => {
    return new Promise(resolve => {
      localStorage.removeItem(`userInfo`)
      setUserInfo(null)
      setUserHeaders({})
      resolve(true)
    })
  }

  const autoLoginModel = () => {
    const _userInfo = localStorage.getItem(`userInfo`)
    if (!userInfo && !_userInfo) {
      autoLoginPopupHandle = setTimeout(userLoginAction, 1000 * 20)
    }
  }

  const getBlogTopic = blog_id => {
    return new Promise(resolve => {
      fetch(`${process.env.API_BASE}/blogTopic/${blog_id}`, {
        method: 'GET',
        async: true,
      })
        .then(res => res.json())
        .then(res => {
          resolve(res || [])
        })
    })
  }

  return (
    <Context.Provider
      value={{
        mainTab,
        setMainTab,
        createRoomModal,
        setCreateRoomModal,
        newTopicModal,
        setNewTopicModal,
        editCommentModal,
        setEditCommentModal,
        roomId,
        setRoomId,
        notificationModal,
        setNotificationModal,
        seeMore,
        setSeeMore,
        loginModal,
        setLoginModal,
        signUpModal,
        setSignUpModal,
        signUpStepNum,
        setSignUpStepNum,
        totalSignUpSteps,
        setTotalSignUpSteps,
        forgotModal,
        setForgotModal,
        filters,
        setFilters,
        voteUpTopic,
        voteDownTopic,
        followingTopic,
        voteUpComment,
        voteDownComment,
        createRoomControl,
        userLogin,
        userSignup,
        userInfo,
        setUserInfo,
        roomsData,
        setRoomsData,
        getRooms,
        getRoom,
        allTopics,
        setAllTopics,
        roomTopics,
        setRoomTopics,
        getTopTopics,
        getRoomTopics,
        categoryData,
        setCategoryData,
        getCategories,
        createNewRoom,
        createNewTopic,
        createNewComment,
        uploadFiles,
        onboardingQuestions,
        setOnboardingQuestions,
        joinRoomAction,
        userHeaders,
        setUserHeaders,
        joinPrivateRoomAction,
        searchModal,
        setSearchModal,
        allRoomModal,
        setAllRoomModal,
        lightboxModal,
        setLightboxModal,
        lightboxAsset,
        setLightboxAsset,
        editModal,
        setEditModal,
        editRecord,
        setEditRecord,
        profileInfo,
        setProfileInfo,
        setEditAddressModal,
        editAddressModal,
        notifications,
        setNotifications,
        coCreationModal,
        setCoCreationModal,
        inviteFriendModal,
        setInviteFriendModal,
        coCreationToolModal,
        setCoCreationToolModal,
        quickLink,
        setQuickLink,
        saveUserData,
        userLogout,
        userProfiles,
        setUserProfiles,
        autoLoginModel,
        userLoginAction,
        getBlogTopic,
        saveOnboardUser,
        newConversationModal,
        setNewConversationModal,
        newMediaUploadModal,
        setNewMediaUploadModal,
        cameraModal,
        setCameraModal,
        recordModal,
        setRecordModal,
        startLiveModal,
        setStartLiveModal,
        scheduleLiveModal,
        setScheduleLiveModal,
        scheduleDetail,
        setScheduleDetail,
        mobileSchedule,
        setMobileSchedule,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default CommunityContextProvider
