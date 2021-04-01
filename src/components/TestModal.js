import React, { useMemo,useState,useEffect } from "react";
import Modal from 'react-awesome-modal';


export default function TestModal() {

    const [visible, setVisible] = useState(false);


    function openModal() {
        setVisible(true);
    }

    function closeModal() {
        setVisible(false);
    }

        return (
            <section>
                <input type="button" value="Open" onClick={() => openModal()} />
                <Modal visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={() => closeModal()}>
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
        );
}