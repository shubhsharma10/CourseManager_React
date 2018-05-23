import React from 'react'
import ReactDOM from 'react-dom'
import CourseManager from './containers/CourseManager'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './style.css'
import '../node_modules/jquery'

ReactDOM.render(
    <CourseManager/>,
    document.getElementById('root')
);