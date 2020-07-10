import React from 'react';

import ArticleCard from './ArticleCard';

class Category extends React.Component {
     render() {
        const { newsData } = this.props;

        return (
            <div className='CategoryContainer'>
                {newsData.map((news, index) => (
                    <ArticleCard key={index} news={news} />
                ))}
            </div>
        )
    }
}

export default Category;