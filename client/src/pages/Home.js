import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsAction'
import {Row,Col,DatePicker} from 'antd';
//import moment from 'moment'
import {Link} from 'react-router-dom'
const {RangePicker} = DatePicker
  const Home = () => {
  
  const {cars} = useSelector(state => state.carsReducers)
  const [totalCars,setTotalcars] = useState([])
  const dispatch = useDispatch()
  

  useEffect(()=>{
      dispatch(getAllCars())
  }, [])

  useEffect(()=>{
    setTotalcars(cars)
  },[cars])

  function setFilter(values) {
    if (values && Array.isArray(values) && values.length === 2) {
        var selectedFrom = new Date(values[0]);
        var selectedTo = new Date(values[1]);
        var temp = [];

        for (var car of cars) {
            if (car.bookedTimeSlots.length === 0) {
                temp.push(car);
            } else {
                var isCarAvailable = true;
                for (var booking of car.bookedTimeSlots) {
                    var bookingFrom = new Date(booking.from);
                    var bookingTo = new Date(booking.to);
                    if (
                      (selectedFrom >= bookingFrom && selectedFrom <= bookingTo) ||
                      (selectedTo >= bookingFrom && selectedTo <= bookingTo) ||
                      (bookingFrom >= selectedFrom && bookingFrom <= selectedTo) ||
                      (bookingTo >= selectedFrom && bookingTo <= selectedTo)
                  )  {
                        isCarAvailable = false;
                        break; // No need to continue checking further bookings
                    }
                }
                if (isCarAvailable) {
                    temp.push(car);
                }
            }
        }
        setTotalcars(temp)
    }    
}


  return (
    <DefaultLayout>
          
          <Row className='mt-3' justify='center'>
            <Col lg={20} sm={24} className='flex justify content-left'>
             <RangePicker 
             showTime={{ format: "HH:mm" }}
             format="MMM DD YYYY HH:mm"
             onChange={setFilter}/>
            </Col>
          </Row>

         <Row justify='center' gutter={16}>
 {totalCars.map(car=>{
    return <Col lg={5} sm={24} xs={24}>
         <div className="car p-2 bs1">
            <img alt='loading' src={car.image} className="carimg"/>

            <div className="car-content d-flex align-items-center justify-content-between">

                 <div className='text-left pl-2'>
                     <p>{car.name}</p>
                     <p> Rent Per Hour {car.rentPerHour}/-</p>
                 </div>

                 <div>
                     <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                 </div>

            </div>
         </div>
    </Col>
})}

</Row>
    </DefaultLayout>
  )
}
export default Home