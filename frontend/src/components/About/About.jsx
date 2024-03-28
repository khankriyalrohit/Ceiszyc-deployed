import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './About.css'

const images = [
    "https://thdcihet.ac.in/wp-content/uploads/2023/03/2023-01-30-2.jpg","https://thdcihet.ac.in/wp-content/uploads/2023/06/thdcihet_Library.jpg","https://cache.careers360.mobi/media/colleges/reviews/IMG20150919095551%20(2).jpg"
]

const About = () => {
  return (
    <div className='aboutcss'>
        <h1 className='heading'>About Us</h1>
      <div className='section'>
<div className="carousel">
    <Carousel>
    {images && images.map((item,i) =>(
                    <img
                    className='CarouselImage'
                    key = {i}
                    src = {item}
                    alt = {`${i} Slide`}
                    />
                   ))}
    </Carousel>
</div>
<div className="content">
    <h2>Tehri Hydro Development Coorporation</h2>
    <p>THDC Institute of Hydropower Engineering and Technology is an engineering college in Bhagirathipuram, Tehri, Uttarakhand. The institute was established in August 2011.

THDC-IHET has initiated the THDC-IHET Research and Development Center to promote renewable energy innovation through teams of scientists and engineers from the institute and any other institutes affiliated with UTU.</p>
<p>The institute has received the award for “Excellent Institute for Promoting Hydropower in Uttarakhand” in the second National Uttarakhand Education Summit & Awards 2015 by CMAI Association of India.</p>
    <a href="https://thdcihet.ac.in/"><button className = "buttonhai">More</button></a>
</div>
      </div>
    </div>
  )
}

export default About
