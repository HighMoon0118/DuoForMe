import React from 'react';

function MatchingModal () {
  return (
    <div>
      <div id="modal" class="modal-overlay">
        <div class="modal-window">
          <div class="title">
            <h2>모달</h2>
          </div>
          <div class="close-area">X</div>
          <div class="content">
            <p>가나다라마바사 아자차카타파하</p>
            <p>가나다라마바사 아자차카타파하</p>
            <p>가나다라마바사 아자차카타파하</p>
            <p>가나다라마바사 아자차카타파하</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchingModal;