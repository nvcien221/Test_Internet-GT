import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { CarouselRef } from 'antd/es/carousel'; 
import css from './carousel.module.scss'
import NextIcon from 'src/assets/icons/next.icon';
import PreviousIcon from 'src/assets/icons/previous.icon';

const contentStyle: React.CSSProperties = {
    margin: 'auto',
    height: '450px',
    width: '900px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',

};

const HomeCarousel: React.FC = () => {
    const onChange = (currentSlide: number) => {
        // console.log(currentSlide);
    };

    // Truy cập các method như next or prev trong thư viện thì dùng useRef
    const refCarousel = useRef<CarouselRef>(null)
    const handleNext = () => {
        refCarousel.current?.next()
    }
    const handlePrev = () => {
        refCarousel.current?.prev()
    }

    return (
        <div className={css['home-carousel']}>
            <div className={css['carousel-img']}>
                <Carousel ref={refCarousel} autoplay={true} afterChange={onChange}>
                    <div className={css['slice-1']}>
                        <img style={contentStyle} src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/enCA/Images/ub10-mh-lg-m-d_tcm185-1056604.jpg" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://e0.pxfuel.com/wallpapers/529/641/desktop-wallpaper-air-jordans-work-in-progress-air-jordans-jordan-shoes-hype-shoes-red-jordan-shoes.jpg" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://www.converse.com/on/demandware.static/-/Library-Sites-ConverseEU01SharedLibrary/default/dw190bc329/firstspirit/converse-uk/media/homepage_1/2023_fall/desktop_33/D-Converse-Search-Page-Shop-FA23-P3.jpg" alt="" />
                    </div>
                    <div>
                        <img style={contentStyle} src="https://p4.wallpaperbetter.com/wallpaper/149/909/314/running-shoes-sports-4k-wallpaper-preview.jpg" alt="" />

                    </div>
                </Carousel>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button style={{border : 'none', backgroundColor: 'white', cursor: 'pointer'}} onClick={handlePrev}><NextIcon ></NextIcon></button>
                <button style={{border : 'none', backgroundColor: 'white', cursor: 'pointer'}} onClick={handleNext}><PreviousIcon></PreviousIcon> </button>
            </div>


        </div>
    );
};



export default HomeCarousel;


