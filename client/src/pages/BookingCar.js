import React,{useEffect, useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsAction'
import { Row,Col, Divider,DatePicker, Checkbox, Modal } from 'antd'
//import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions'
//import StripeCheckout from 'react-stripe-checkout'

const { RangePicker } = DatePicker;

const BookingCar = () => {
  const {carid} = useParams();

  const {cars} = useSelector(state => state.carsReducers)
  const dispatch = useDispatch()
  const[car,setcar]=useState({})
  const[from,setFrom]=useState()
  const[to,setTo]=useState()
  const[totalHours,setTotalHours]=useState(0)
  const[driver,setDriver]=useState(false)
  const[totalAmount,setTotalAmount]=useState(0)
  const[showModal,setShowModal]=useState(false)
  

  useEffect(()=>{
    if (cars.length === 0) {
      dispatch(getAllCars());
    }else
      {
        setcar(cars.find((o)=>o._id === carid))
      }
  }, [cars])
  useEffect(()=>{
    setTotalAmount((totalHours*car.rentPerHour))
    if(driver)
    {
      setTotalAmount(totalAmount + (30*totalHours))
    }
  },[driver,totalHours])

  

   function selectTimeSlots(values) {
    if (values && Array.isArray(values) && values.length === 2) {
      const [start, end] = values;
       setFrom( start.format("MMM DD YYYY HH:mm"));
       setTo( end.format("MMM DD YYYY HH:mm"));
       setTotalHours(values[1].diff(values[0], "hours"));
    } else {
      console.error("Invalid date range");
    }
   }

  

  function onToken(){
    const reqObj = {
      
      user : JSON.parse(localStorage.getItem('user'))._id,
      car : car._id,
      totalHours,
      totalAmount,
      driverRequired : driver,
      bookedTimeSlots : {
        from,
        to,
      },
    }
    dispatch(bookCar(reqObj))
  }
  
  return (
    <DefaultLayout>
        <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh'}}>
          <Col lg={10} sm={24} xs={24} className='p-3'>
              <img alt='loading' src={car.image} className='carimg2 bs1 w-100'/>
          </Col>
          <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>

          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD YYYY HH:mm"
            onChange={selectTimeSlots}
          />

          <br />
          <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
          {from && to &&(
            <div>
            <p>Total Hours : <b>{totalHours}</b></p>
            <p>Rent Per Hour : <b>{car.rentPerHour}</b></p>
            <Checkbox onChange={(e)=>{
              if(e.target.checked)
              {
                setDriver(true);
              }else{
                setDriver(false);
              }
            }}>Driver Required</Checkbox>
            
            <h3>Total Amount : {totalAmount}</h3>

            <button className='btn1' onClick={onToken} >Book Now</button>
            {/* <StripeCheckout 
            shippingAddress
            token={onToken}
            currency="INR"
            amount={totalAmount*100}
            stripeKey='pk_test_51OlW0YSGIrVx63av3DzUqMcKaHn4smSUeRv85No1y0GUmDMiz3OlaPMe01kGVDKw1WHdCEAkN0qtjnymEu3ZB05e00TdJUklPz'>
            <button className='btn1' >Book Now</button>
            </StripeCheckout> */}
            </div>
          )}

          </Col>
          
          
        {car.name && (
          <Modal
            open={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
         
        </Row>
    </DefaultLayout>
  )
}

export default BookingCar