import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  Modal.setAppElement('#root');

  const now=moment().minute(0).second(0).add(1,"hours");

//   const end=moment().minute(0).second(0).add(1,"hours");
  const end =now.clone(now).add(1,"hours");


const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [endDate, setEndDate] = useState(end.toDate());


    const handleStartDateChange=(e)=>{
        // console.log(e);
        setDateStart(e);
    }
    const handleEndDateChange=(e)=>{
        // console.log(e);
        setEndDate(e);
    }
    const closeModal =()=>{
        // console.log('close');
    }
    return (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                    onChange={handleEndDateChange}
                    minDate={dateStart}
                    value={endDate}
                    className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
        );
}
 
export default CalendarModal;