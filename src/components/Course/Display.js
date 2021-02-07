import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';


import './IngredientForm.css';

import axios from 'axios';

const Display = React.memo(props => {
    const [topic, setTopic] = useState('');

    useEffect(() => {
        console.log('ST '+props.selectedTopic);
        axios.get('http://localhost:3000/react/get-content', { params: { id: ((props.selectedTopic.length!=='')?props.selectedTopic:'-1') } })
            .then(topic => {
                console.log('selected topic content');
                console.log(topic);
                setTopic(topic.data);

            });
    }, [props.selectedTopic]);
    // const onTopicChange = domainId => {
    //   props.onChangeDomain(domainId);
    //   console.log('domainId='+domainId);
    //   //event.preventDefault();
    //   // ...
    // };

   
   



    return (
        <section style={{height:100+'%'}} >
            <Card style={{height:100+'%'}}>
               
                
            <div  style={{height:100+'%'}}>
                            <iframe title="Preview"  src={((topic!=='')?('http://localhost:3000/author/topic/'+topic):'http://localhost:3000/author/topic/rmdhtml/preview.html')} id="frame"   frameBorder="0"></iframe>
                        </div>
                 
               
                
                            
                           
            </Card>
        </section>
    );
});

export default Display;
