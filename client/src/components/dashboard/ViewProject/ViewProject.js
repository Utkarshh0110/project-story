import React, {useState, useEffect} from 'react'
import { getProjectDetails } from '../../../helper'
import Imagehelper from '../ImageHelper/Imagehelper'


const ViewProject = ({match}) => {
    const [projectInfo, setProjectInfo] = useState({
        loading: false,
        photo: null,
        comment: ""
    })

    const preLoad = (productId) => {
        getProjectDetails(productId).then(response => {
            setProjectInfo({...projectInfo, photo: response.photo, comment: response.comment, loading: true})
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        preLoad(match.params.id)
    }, [])

    return (
        <div>
            <h2>{projectInfo.comment}</h2>
            {projectInfo.loading ? <Imagehelper project={projectInfo} /> : null}
        </div>
    )
}

export default ViewProject
