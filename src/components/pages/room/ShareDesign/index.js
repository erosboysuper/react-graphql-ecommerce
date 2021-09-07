import React, { useContext } from 'react'
import styled from 'styled-components'
import { Cover, Letter } from '~/utils/styles'
import NewIcon from '~/images/Assets/New.svg'
import RoomContext from '~/context/RoomContext'
import ShareDesignModal from '~/components/pages/room/ShareDesignModal'

const ShareDesign = () => {
  const { shareDesignModal, setShareDesignModal } = useContext(RoomContext)
  return (
    <Container>
      <Title>
        <Letter font="Titillium Black" size={20} color="black">
          Designs
        </Letter>
      </Title>
      <ShareButton>
        <button onClick={() => setShareDesignModal(true)}>
          <Letter font="Titillium Bold" size={16} color="white">
            SHARE A DESIGN
          </Letter>
          <img src={NewIcon} />
        </button>
      </ShareButton>
      {shareDesignModal === true && (
        <React.Fragment>
          <ShareDesignModal />
          <Cover
            background={shareDesignModal === true ? 0.5 : 0}
            index={shareDesignModal === true ? 10 : 0}
            onClick={() => setShareDesignModal(false)}
          />
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div`
  background: #f2f2f7;
  padding-left: 16px;
  padding-bottom: 26px;
`

const Title = styled.div`
  padding-top: 17px;
`

const ShareButton = styled.div`
  position: relative;
  margin-top: 15px;
  margin-right: 15px;
  margin-bottom: 26px;
  & button {
    width: 100%;
    background: #ff8c00;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & img {
    position: absolute;
    top: 20px;
    right: 30px;
  }
`

export default ShareDesign
