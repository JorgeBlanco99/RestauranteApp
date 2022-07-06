import React,{useState} from 'react'
import {QRCodeCanvas} from 'qrcode.react';
import {GiTable} from 'react-icons/gi';
import { clientTypes } from '../utils/data';

const QrGenerator = () => {
    const [qr, setQr] = useState('');
    const [table,settable] = useState("");
    const [clientType ,setClientType] = useState(null);

    const qrGen = () => {
        const data = {
            table: table,
            Type: clientType,
          }
          //Set here menu link to generate qr
        setQr("http://192.168.1.63:3000/menu?table="+table+"&type="+clientType);
    }
    const downloadQR = () => {
        const qr = document.getElementById("myqr");
        const pngUrl = qr
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "mesa"+table+".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

  return (
    <div className='w-full min-h-screen flex py-6 items-start justify-center'>
    <div className=' w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col justify-center items-center gap-4'>
        <div className='w-full'>
          <select onChange={(e)=>setClientType(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white"> Selecione la categoria</option>
            {clientTypes && clientTypes.map((item)=> (<option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-headingColor"
            value={item.urlParamName}>
              {item.name}
            </option>
            ))}
          </select>
        </div>
      <div className=' w-full py-2 border-b border-gray-300 flex items-center gap-3'>
        <GiTable className='text-x1 text-gray-700'/>
        <input type="text" requiered value={table} onChange={(e) => settable(e.target.value)}
         placeholder="Numero de mesa"
        className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'/>
      </div>
      <div>
      {
            qr ?
                <QRCodeCanvas 
                    id="myqr"
                    value={qr} 
                    size={320}
                    includeMargin={true}
                /> :
                <p>No ha generado el QR</p>
        }
      </div>
      <div className='flex items-center w-full'>
        <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={()=> qrGen()}> Generar</button>
      </div>
      <div className='flex items-center w-full'>
        <button type='button' className=' ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={()=> downloadQR()}> Descargar</button>
      </div>
    </div>
  </div>
  )
}

export default QrGenerator