import React from 'react';
import './Commitment.scss';

Commitment.propTypes = {

};

function Commitment(props) {
  return (
    <div class="container standard">
      <hr />
      <dl class="row">
        <dd class="col-md-4 text-center">
          <i class="far fa-check-circle fa-4x"></i>
          <br />
          <h5>Hàng chính hãng</h5>
          <p>Hàng chính hãng 100% được kiểm tra bởi ABC company</p>
        </dd>
        <dd class="col-md-4 text-center">
          <i class="fas fa-exchange-alt fa-4x"></i>
          <br />
          <h5>Miễn trả trong vòng 7 ngày</h5>
          <p>Khách hàng có thể miễn trả sản phẩm nếu bị hư hỏng trong vòng 7 ngày</p>
        </dd>
        <dd class="col-md-4 text-center">
          <i class="fas fa-truck-monster fa-4x"></i>
          <br />
          <h5>Miễn phí vân chuyển</h5>
          <p>Giao hàng miễn phí trong nội thành TP.Hồ Chí Minh</p>
        </dd>
      </dl>
    </div>
  );
}

export default Commitment;