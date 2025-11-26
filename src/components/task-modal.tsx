import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import type { Task } from "../entities/task";
import { isValidTaskDescription, isValidTaskTitle, isValidTaskTitleTwo } from "../utils/validation";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "../utils/constants";

const ModalBack = styled.div<{visable: boolean}>`
  position: absolute;
  background: rgba(0, 31, 29, 0.15);
  inset: 0px;
  opacity: ${p => (p.visable ? 1 : 0)};
  border-top-left-radius: 0;
  border-top-right-radius: ${p => p.theme.radius.wrapper};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: ${p => p.theme.radius.wrapper};
`;

const Modal = styled.div<{visible: boolean}>`
    min-width: ${p => p.theme.spacing(48)};
    background-color: ${p => p.theme.colors.surface};
    padding: 
    ${p => p.theme.spacing(2.7)};
    padding-top: 
    ${p => p.visible ? p.theme.spacing(3.7) : p.theme.spacing(1.7)};
    padding-bottom: 
    ${p => p.visible ? p.theme.spacing(3.7) : p.theme.spacing(1.7)};
    border-radius: ${p => p.theme.spacing(0.7)};
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(2)};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${p => p.visible ? 1 : 0.3};
    box-shadow: 0 7px 17px rgba(24, 0, 31, 0.5);
    transition: all 0.4s ease;
`;

const TextModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    gap: ${p => p.theme.spacing(1)};
    background-color: ${p => p.theme.colors.surface};
    padding: ${p => p.theme.spacing(2)};
    border: none;
    border-left: 3px solid ${p => p.theme.colors.border.built_in};
    height: ${p => p.theme.spacing(20)};
`;

const StyledButtonSave = styled.button`
    background-color: ${p => p.theme.colors.accent};
    &:hover { background-color: 
    ${p => p.theme.colors.accentHover};}
    border-radius ${p => p.theme.radius.lg};
    cursor: pointer;
    color: ${p => p.theme.colors.surface};
    padding: ${p => p.theme.spacing(2)};
    border:none;
    border-radius: ${p => p.theme.spacing(0.4)};
`;

const StyledButtonСancellation = styled.button`
    background-color: ${p => p.theme.colors.accentСancellation};
    &:hover { background-color: 
    ${p => p.theme.colors.accentHoverСancellation};}
    border-radius ${p => p.theme.radius.lg};
    cursor: pointer;
    color: ${p => p.theme.colors.surface};
    padding: ${p => p.theme.spacing(2)};
    border:none;
    border-radius: ${p => p.theme.spacing(0.4)};
`;

const ButtonModalContainer = styled.div`
    display: flex;
    gap: ${p => p.theme.spacing(2)};
    margin-top: ${p => p.theme.spacing(2)};
`;

const InputModal = styled.input`
  background-color: ${p => p.theme.colors.surface};
  padding: ${p => p.theme.spacing(2)};
  border: none;
  border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.border.built_in};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s;

  &: hover {
   border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.accent};
  }

  &: focus {
    box-shadow: 0 0 8px ${p => p.theme.colors.accent};
    &: hover {
      border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.border.built_in};
  }
  }
`;

const AreaModal = styled.textarea`
  background-color: ${p => p.theme.colors.surface};
  padding: ${(p) => p.theme.spacing(2)};
  border: none;
  border-left: ${p => p.theme.spacing(0.4)} solid ${(p) => p.theme.colors.border.built_in};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s;
  resize: none;
  overflow: hidden;

  &: hover {
    border-left: ${p => p.theme.spacing(0.4)} solid ${(p) => p.theme.colors.accent};
  }

  &: focus {
    box-shadow: 0 0 8px ${p => p.theme.colors.taskLine};
    &: hover {
      border-left: ${p => p.theme.spacing(0.4)} solid ${p => p.theme.colors.border.built_in};
  }
  }
`;

const StyledSaveError = styled.button`
    background-color: ${p => p.theme.colors.StyledSaveError};
    border-radius ${p => p.theme.radius.lg};
    cursor: pointer;
    color: ${p => p.theme.colors.surface};
    padding: ${p => p.theme.spacing(2)};
    border:none;
    border-radius: ${p => p.theme.spacing(0.4)};
`;

const ErrorModal = styled.p`
    color: ${p => p.theme.colors.error};
    margin: ${p => p.theme.spacing(0.4)};
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

export type TaskModalProp = {
    task: Task;
    onSave: (id: string, newTitle: string, description: string) => void;
    onClose: () => void;
}

export default function TaskModal (p: TaskModalProp) {
    const [title, setTitle] = useState(p.task.title);
    const [description, setdescription] = useState(
        p.task.description ?? ''
    );
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 5);

        const hendler = (event: KeyboardEvent) => {
        if(event.key === 'Escape') p.onClose();
        }
        window.addEventListener('keydown', hendler);
        return () => {
            clearTimeout(t);
            window.addEventListener('keydown', hendler);
        }
    }, [p]);

    let errorTextTitle;
    let errorTextArea;
    let button;
    let buttonError =
            <StyledSaveError>
                save
            </StyledSaveError>;
            
    if(isValidTaskTitle(title) === false){
        button = buttonError;
        errorTextTitle=<ErrorModal>! {title.length} &gt; {MAX_TITLE_LENGTH}</ErrorModal>
    }
    else if(isValidTaskTitleTwo(title) === true){
        button =  <StyledButtonSave 
                    onClick={() => {
                       p.onSave(p.task.id, title, description);
                       p.onClose();
                    }}>
                    save
                  </StyledButtonSave>
    }
    else{
        button = buttonError;
        errorTextTitle=<ErrorModal>&#9888;</ErrorModal>
    }
            
    if(isValidTaskDescription(description) === false){
        button = buttonError;
        errorTextArea=<ErrorModal>! {description.length} &gt; {MAX_DESCRIPTION_LENGTH}</ErrorModal>
    }

    return(<ModalBack visable={visible}>
        <Modal visible={visible}>
                <h2>Editing a task</h2>
            <TextModalContainer>
                <Container>
                    <InputModal
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      type="text"
                      placeholder="fill the void..."
                    />
                    {errorTextTitle}
                </Container>
                <Container>
                    <AreaModal
                      value={description}
                      onChange={e => setdescription(e.target.value)}
                      placeholder="...where 'description'? well, okay"
                    />
                    {errorTextArea}
                </Container>
            </TextModalContainer>
            <ButtonModalContainer>
                <StyledButtonСancellation 
                onClick={() => p.onClose()}>
                    cancell
                </StyledButtonСancellation>

            {button}
            </ButtonModalContainer>
        </Modal>
    </ModalBack>)
}

