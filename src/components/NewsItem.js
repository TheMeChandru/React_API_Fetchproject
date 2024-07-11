// import React, { Component } from 'react'

const NewsItem =(props)=> {

  
    let { title, description, imageUrl, newsUrl, author, publishedAt ,source } =props;
    return (

      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:1}}>
             {source}
            </span>
          <img src={!imageUrl ? "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2024/07/astroid-reuters-1720336613.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} 
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>

            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
