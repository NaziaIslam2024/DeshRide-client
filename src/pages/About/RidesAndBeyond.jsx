import React from 'react';
import Highway from "../../assets/Images/about/highway.jpg"
const RidesAndBeyond = () => {
    return (
        <div className='container mx-auto'>
            <div className='grid lg:grid-cols-2 p-5 sm:p-20 gap-20 mb-[100px]'>
                <div cla>
                    <img src={Highway} alt="" />
                </div>
                <div className='grid items-center'>
                    <div>
                    <h3 className='text-4xl font-medium pb-5'>Rides and beyond</h3>
                    <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae soluta delectus pariatur fuga totam placeat numquam aperiam illo tenetur maxime repellendus et perspiciatis illum temporibus magnam aut, molestias debitis! Odio labore eaque dolorum enim accusamus totam blanditiis esse iure!
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RidesAndBeyond;