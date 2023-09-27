import React, { useState } from "react";
import { ModalComp } from "../../modal/Modal";
import { Reveal } from "../../utils/Reveal";
import { StandardButton } from "../../buttons/StandardButton";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedEmailType } from "../../../redux/slices/userSelectedEmailTypeSlice";
import "./EmailTypeCards.css";

function EmailTypeCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const selectedCard = useSelector((state) => state.getSelectedEmailType);

  const dispatch = useDispatch();

  const cardsData = {
    "Chargeback Emails": [
      { id: "rdr", title: "RDR", info: "This is RDR chargeback." },
      {
        id: "logistics",
        title: "Logistics",
        info: "This is Logistics chargeback.",
      },
      { id: "asn", title: "ASN", info: "This is ASN chargeback." },
      {
        id: "packaging",
        title: "Packaging",
        info: "This is Packaging chargeback.",
      },
      { id: "quality", title: "Quality", info: "This is Quality chargeback." },
    ],
  };

  // Sort the cards data by id
  const sortedCardsData = {};
  for (const type in cardsData) {
    sortedCardsData[type] = cardsData[type].sort((a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  }

  const handleCardClick = (cardId, cardInfo) => {
    setModalContent(cardInfo);
    dispatch(getSelectedEmailType(cardId));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Reveal>
          <div className="cards">
            {Object.keys(sortedCardsData).map((type) => (
              <div key={type}>
                <div className="label">{type}</div>
                <div className="card-container">
                  {sortedCardsData[type].map((card) => (
                    <div
                      key={card.id}
                      className={`card ${
                        selectedCard === card.id ? "selected" : ""
                      }`}
                      onClick={() => handleCardClick(card.id, card.info)}
                    >
                      {card.title}
                      <div className="info-arrow" onClick={openModal}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  ))}

                  {isModalOpen && (
                    <ModalComp
                      modalTitle={selectedCard.toUpperCase()}
                      modalContent={modalContent}
                      openMod={isModalOpen}
                      setOpenMod={setIsModalOpen}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div
            style={{
              marginTop: "40px",
              marginLeft: "0.5rem",
              float: "right",
              paddingLeft: "1rem",
            }}
          >
            <StandardButton
              onClick={() =>
                document.getElementById("upload-file")?.scrollIntoView()
              }
            >
              Continue
            </StandardButton>
          </div>
        </Reveal>
      </div>
    </>
  );
}

export default EmailTypeCards;
