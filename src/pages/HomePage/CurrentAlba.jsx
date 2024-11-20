import React from "react";
import danpatImage from "../../assets/images/danpatImage.png"

const CurrentAlba = ({totalAlba,danpatAlba}) => {
    return (
        <main>
            <img className="danpatImage" src={danpatImage} alt="danpatIMG"/>
            
            <section className='currentAlba'>
                <h1>원하는 알바생을 찾아보세요!</h1>

                <div className='albaContainer'>
                    <article className='totalAlba'>
                        <h5>전체 알바생</h5>
                        <h2>{totalAlba}</h2>
                    </article>

                    <article className='danpatAlba'>
                        <h5>우리 단팥러</h5>
                        <h2 style={{color:"var(--secondary-color)"}}>{danpatAlba}</h2>
                    </article>

                </div>
            </section>
        </main>


    
);
}

export default CurrentAlba;
