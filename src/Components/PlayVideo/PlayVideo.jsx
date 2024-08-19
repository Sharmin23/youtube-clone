import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import  video from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import sava from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'


const PlayVideo = ({videoId}) => {
    const [apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [commentData,setCommentData] = useState([]);

    const fetchVideoData = async () =>{
        const videoDetails_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch (videoDetails_url).then(res =>res.json()).then(data =>setApiData(data.items[0]));
     }
     const fetchOtherData = async () =>{
        //fetching channel data;
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(ChannelData_url).then(res => res.json).then(data=>setChannelData(data.items[0]) )

        //Fetching comment Data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key= ${API_KEY}`;
        await fetch(comment_url).then(res =>res.json()).then(data =>setCommentData(data.items)
        )
     }

     useEffect(()=>{
        fetchVideoData();
     },[])
     useEffect(()=>{
        fetchOtherData();
     },[apiData])
  return (
    <div className='play-video'>
        {/* <video src={video} controls autoPlay muted ></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}` } frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className='play-video-info'>
            <p>{apiData?value_converter(apiData.statistics.viewCount):"16K"} views &bull; {moment(apiData?.snippet?.publishedAt).fromNow()  }</p>   
            <div>
            <span><img src={like} alt="" />{apiData?.statistics?.likeCount}</span>
            <span><img src={dislike} alt="" />10</span>
            <span><img src={share} alt="" />Share</span>
            <span><img src={sava} alt="" />Save</span>
        </div>
        </div>
       
        <hr />
        <div className='publisher'>
            <img src={ChannelData?ChannelData?.snippet?.thumbnails?.default.url:""} alt="" />
            <div>
            <p>{apiData?apiData.snippet.channelTitle:""}</p>
            <span>{ChannelData?ChannelData.statistics.subscriberCount:"1M"}</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            {/* <p>Channel that makes learning Easy</p> */}
            {/* <p>Subscribe GreatStack to watch More Tutorials on web development</p> */}
            <p>{apiData?apiData.snippet.description:'Description Here'}</p>
            <hr />
            <h4>{apiData?apiData.statistics.commentCount:102} Comments</h4>
            {commentData.map((item,index)=>{
              return (
                <div key ={indx} className="comment">
                <img src={user_profile} alt="" />
                <div>
                    <h3>Jack Nicholson <span>1 day ago</span></h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam neque rerum iure ut autem quibusdam nisi distinctio provident iste recusandae.</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>233</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
              )  
            })}
            
        </div>
    </div>
    

  )
}

export default PlayVideo

/*{moment(apiData.snippet.publishedAt).fromNow():""}*/  //Error 

// value_converter(apiData.statistics?.likeCount) //32 no. line
// <p>{apiData?apiData.snippet.description:slice(0,250):'Description Here'}</p> //51

//used value convertor function but if i use this then get error
{/* <img src={ChannelData?ChannelData?.snippet?.thumbnails?.default.url:""} alt="" /> */} //51 no .line
//{ChannelData?ChannelData.statistics.subscriberCount:"1M"} //54