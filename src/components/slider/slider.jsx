import './slider.scss'
import arrow from './arrow.svg'
import {useEffect, useState} from "react";

function Slider() {
    const [user, setUser] = useState()
    const [num, setNum] = useState(1)
    const [info, setInfo] = useState()
    const [currentId, setCurrentId] = useState()

    const users = fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())

    useEffect(() => {
        users
            .then(result => {
                const u = result.map(elem => {
                    return <figure key={elem.id} onClick={() => show(elem.id + num)}
                                   tabIndex={elem.id}
                    >

                        <img src={`https://i.pravatar.cc/200?img=${elem.id}`} alt=""/>
                        <figcaption>
                            <p> {elem.name}</p>
                            <p>{elem.company.name}</p>
                        </figcaption>
                    </figure>


                })
                setUser(u)
            })
    }, [])

    function changeSlide(currentNum) {
        setNum(num + currentNum)
        users
            .then(result => {
                const names = result.map(elem => elem.name)
                const company = result.map(elem => elem.company.name)
                const u = result.map(elem => {
                    /*Попробуй что нибудь придумать
                    * с тернарником для смены класса у
                    * блока)*/
                    return <figure key={elem.id} onClick={() => show(elem.id + num)}
                                   tabIndex={elem.id}
                    >
                        <img src={`https://i.pravatar.cc/200?img=${elem.id + num}`} alt=""/>
                        <figcaption>
                            <p> {names[elem.id + num]}</p>
                            <p>{company[elem.id + num]}</p>
                        </figcaption>
                    </figure>


                })
                setUser(u)
            })
    }

    function show(id) {
        setCurrentId(id)
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(result => {
                const posts = result.filter(elem => id === elem.userId
                ).slice(0, 3).map(elem => <div>
                    <p>body: {elem.body}</p>
                    <p>Title: {elem.title}</p>
                </div>)
                setInfo(posts)
            })
        console.log(currentId)
    }


    return <div className={'slider'}>
        <div className={"slider-buttons"}>
            <button><img src={arrow} alt="" className={"slider-buttons_left"} onClick={() => changeSlide(-1)}/></button>
            <button><img src={arrow} alt="" className={"slider-buttons_right"} onClick={() => changeSlide(1)}/></button>
        </div>
        <div className={'users'}>
            {user}
        </div>
        {info}
    </div>
}


export default Slider
