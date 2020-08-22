import React from "react";
import { SignIn } from "./SignIn";
import { LogIn } from "./Login";
import { Modal, Panel, FlexboxGrid } from "rsuite";
export const AuthModal = ({ show, close }) => {
  return (
    <Modal show={show} onHide={close} size="lg">
      <Modal.Body>
        <FlexboxGrid justify="space-around" align="middle">
          <FlexboxGrid.Item>
            <Panel bordered>
              <LogIn />
            </Panel>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Panel bordered>
              <SignIn />
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Body>
    </Modal>
  );
};
