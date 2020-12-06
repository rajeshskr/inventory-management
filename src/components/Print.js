import React, { useEffect, useState } from 'react';
import { getPrintInvoice, removePrintInvoice } from 'src/localforageUtils';
import moment from 'moment';
import { addr, currency, float } from 'src/utils';
import logo from './logo.json';

// eslint-disable-next-line react/prefer-stateless-function
function Print() {
  const [printInvoice, setPrintInvoice] = useState({});
  const {
    fullName,
    address = '',
    phone1,
    phone2,
    billno,
    billdate,
    items = []
  } = printInvoice || {};
  useEffect(() => {
    getPrintInvoice().then((data) => {
      setPrintInvoice(data);
      setTimeout(() => {
        window.print();
      }, 300);
    });
    window.addEventListener('beforeunload', removePrintInvoice);
  }, []);
  let total = 0;
  items.forEach((item) => {
    total += (float(item.price) * float(item.quantity));
  });
  return (
    <div className="invoice-container">
      <header>
        <div className="row align-items-center">
          <div className="col-sm-7 text-center text-sm-left mb-3 mb-sm-0">
            <img id="logo" src={`data:image/png;base64,${logo.dataUrl}`} title="Furnitures Point" alt="Furnitures Point" height="75px" width="214px" />
          </div>
          <div className="col-sm-5 text-center text-sm-right">
            <h4 className="text-7 mb-0">Invoice</h4>
          </div>
        </div>
        <hr />
      </header>

      <main>
        <div className="row">
          <div className="col-sm-6">
            <strong>Date:</strong>
            <span style={{
              padding: '0 5px'
            }}
            >
              {moment(billdate).format('DD MMM YYYY HH:mm A')}
            </span>

          </div>
          <div className="col-sm-6 text-sm-right">
            <strong>Invoice No:</strong>
            <span style={{
              padding: '0 5px'
            }}
            >
              {`#${billno}`}
            </span>

          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-6 text-sm-right order-sm-1">
            <strong>Pay To:</strong>
            <address style={{ lineHeight: '30px' }}>
              FURNITURE POINT
              <br />
              No: 2/39, Mount Poonamallee Road,
              <br />
              Kattupakkam, Chennai- 600056
              <br />
              Phone: 044-43851959, 8680914793
            </address>
          </div>
          <div className="col-sm-6 order-sm-0">
            <strong>Invoiced To:</strong>
            <address style={{ lineHeight: '30px', overflowWrap: 'break-word' }}>
              {fullName}
              <br />
              {address ? (
                <>
                  {addr(address)}
                </>
              ) : null}
              {(phone1 || phone2) ? `Phone: ${phone1}, ${phone2}` : ''}
            </address>
          </div>
        </div>
        <div
          className="card"
          style={{
            margin: '15px 0 20px 0'
          }}
        >
          <div className="card-body px-2">
            <div className="table-responsive">
              <table className="table">
                <thead className="card-header px-2 py-0">
                  <tr>
                    <td className="col-3 border-0"><strong>Item</strong></td>
                    <td className="col-2 text-center border-0"><strong>Rate</strong></td>
                    <td className="col-1 text-center border-0"><strong>Quantity</strong></td>
                    <td className="col-2 text-right border-0"><strong>Amount</strong></td>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? items.map((item) => {
                    const { itemName, price, quantity } = item;
                    return (
                      <tr>
                        <td
                          className="col-3 border-0"
                          style={{
                            maxWidth: '350px',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {itemName}

                        </td>
                        <td
                          className="col-2 text-center border-0"
                          style={{
                            minWidth: '10rem',
                            maxWidth: '160px',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {currency(price)}

                        </td>
                        <td
                          className="col-1 text-center border-0"
                          style={{
                            maxWidth: '120px',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {quantity}

                        </td>
                        <td
                          className="col-2 text-right border-0"
                          style={{
                            minWidth: '10rem',
                            maxWidth: '180px',
                            overflowWrap: 'break-word'

                          }}
                        >
                          {currency(float(price || 0) * float(quantity))}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td className="col-12 text-center" colSpan="4">No Items Added to bill</td></tr>
                  )}
                  <tr>
                    <td colSpan="3" className="bg-light-2 text-right"><strong>Total:</strong></td>
                    <td className="bg-light-2 text-right">{currency(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <footer
        className="mt-4"
        style={{
          margin: 0
        }}
      >
        <div
          style={{
            display: 'flex'
          }}
        >
          <div style={{
            maxWidth: '400px'
          }}
          >
            <p style={{
              margin: 0
            }}
            >
              <strong>NOTE :</strong>

            </p>
            <div>Under Composition Scheme</div>
            <ul>
              <li>Goods once sold cannot be returned</li>
              <li>No warranty for imported products</li>
            </ul>
          </div>
          <div style={{
            flex: 'auto'
          }}
          />
          <div style={{
            maxWidth: '215px',
            textAlign: 'right'
          }}
          >
            <strong>For Furniture Point</strong>
            <div style={{
              marginTop: '80px'
            }}
            >
              Authorized Signatory

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Print;
