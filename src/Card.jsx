import React, { useState } from 'react';
import './Card.css';

const Card = () => {
  const [input, setInput] = useState('');
  const [qr, setQr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getQRcode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${input}`
      );
      if (res.ok) {
        setQr(res.url);
      } else {
        console.error('Failed to fetch QR code');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (qr) {
      const a = document.createElement('a');
      a.href = qr;
      a.download = 'qrcode.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container p-4">
      <form onSubmit={getQRcode} className=" ">
        <h1>QR CODE GENERATOR</h1>
        <div
          className="container border border-info border-3 mb-5 mt-3"
          style={{ height: '450px', width: '400px' }}
        >
          <input
            type="text"
            className="form-control my-3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="enter URL or text"
          />

          {isLoading && <div className="loading"><span>Loading...</span></div>}

          <div className="container bg-transparent mx-auto border border-info" style={{ height: '300px', width: '300px' }}>
            {!isLoading && (qr ? <img className="qr_code" src={qr} alt="qr_code" /> : <div className="loading">Generate QR code</div>)}
          </div>

          <button type="submit" className="btn btn-primary mt-3 me-3">Generate QR code</button>
          <button onClick={downloadQRCode} className="btn btn-success mt-3">Download QR code</button>
        </div>
      </form>
    </div>
  );
};

export default Card;

