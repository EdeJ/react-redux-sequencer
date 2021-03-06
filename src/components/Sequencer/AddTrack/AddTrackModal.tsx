import * as React from "react"
import Modal from "react-modal"
// tslint:disable-next-line:no-submodule-imports
import styled from "styled-components/macro"

import { usePrefs } from "../../context/sequencer-prefs"

import Color, { MaterialColor } from "../../../utils/color/colorLibrary"
import { IInstrument } from "../../../redux/store/instrument/interfaces"

interface IProps {
  color: MaterialColor
  isOpen: boolean
  onAfterOpen: () => void
  onClose: () => void
  onInstrumentSelect: (instrument: IInstrument) => void
  instrumentList: { [group: string]: { [instrumentID: string]: IInstrument } }
}

const StyledModal = styled.div<{ gutter: number; color: MaterialColor }>`
  display: flex;
  flex-direction: column;
  margin: ${({ gutter }) => gutter * 2}px;
  color: ${({ color }) => Color.get100(color)};
`

const StyledModalHeader = styled.div`
  display: flex;

  & h2 {
    margin-top: 0;
  }
`

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledModalParagraph = styled.div<{ color: MaterialColor }>`
  color: ${({ color }) => Color.get300(color)};
  font-weight: 300;
`

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledListItem = styled.div``

const StyledListButtonItem = styled.button<{
  gutter: number
  color: MaterialColor
}>`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${({ gutter }) => gutter}px;
  padding: ${({ gutter }) => gutter * 2}px;
  background-color: ${({ color }) => Color.get700(color)};
  font-size: 14px;
  color: ${({ color }) => Color.get50(color)};
  line-height: 1;
  border: none;
  border-radius: 3px;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${({ color }) => Color.get600(color)};
    color: white;
  }

  & .infos {
    //font-size: 0.9em;
    font-weight: 300;
  }
`

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  content: {
    position: "absolute",
    top: "10%",
    left: "30%",
    right: "30%",
    bottom: "10%",
    border: "none",
    background: Color.get900(Color.BLUE_GREY),
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "3px",
    outline: "none"
  }
}

Modal.setAppElement("#root")

function AddTrackModal(props: IProps) {
  const { gutter } = usePrefs()

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onClose}
      style={modalStyles}
      contentLabel="Ad Track Modal"
    >
      <StyledModal color={props.color} gutter={gutter}>
        <StyledModalHeader>
          <h2>New track</h2>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledModalParagraph color={props.color}>
            Pick an instrument in the list
          </StyledModalParagraph>
          <StyledList>
            {Object.keys(props.instrumentList).map(group => (
              <StyledListItem key={`group_${group}`}>
                <h3>{group}</h3>
                <StyledList>
                  {Object.keys(props.instrumentList[group]).map(
                    instrumentID => (
                      <StyledListButtonItem
                        key={`instrument_${instrumentID}`}
                        color={props.color}
                        gutter={gutter}
                        onClick={() =>
                          props.onInstrumentSelect(
                            props.instrumentList[group][instrumentID]
                          )
                        }
                      >
                        <span>
                          {props.instrumentList[group][instrumentID].label}
                        </span>
                        <span className={"infos"}>
                          {
                            props.instrumentList[group][instrumentID].sampleIDs
                              .length
                          }{" "}
                          sample
                          {props.instrumentList[group][instrumentID].sampleIDs
                            .length > 1 && "s"}
                        </span>
                      </StyledListButtonItem>
                    )
                  )}
                </StyledList>
              </StyledListItem>
            ))}
          </StyledList>
        </StyledModalBody>
      </StyledModal>
    </Modal>
  )
}

export default AddTrackModal
