import React from 'react';

import placeholderImg from '../placeholderImg.png';

const ArticleCard = props => {
    const { 
        urlToImage,
        author,
        title,
        description,
        publishedAt,
        url
        } = props.news;
    return(
        <div onClick={() => window.location.href = url} className='ArticleCardContainer'>
            <div className='ArticleCardImgContainer'>
                <img className='ArticleCardImg' alt='NO 1MAGE' src={urlToImage || placeholderImg}/>
            </div>
            <div className='ArticleCardInfoContainer'>
                <span className='ArticleCardTitle'>{title || 'No Title'}</span>
                <span className='ArticleCardBy'>By {author || 'Author unknown'} on {publishedAt || 'Unknown'}</span>
                <p className='ArticleCardContent'>{description}</p>
            </div>
        </div>
    )
};

//NOTE: I didn't used default props here because all solutions for nested default props were seem to tricky and risky

export default ArticleCard;