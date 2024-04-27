import React, { useState } from 'react';
import { Button, Modal } from 'antd';
// import { GoogleLogin } from '@react-oauth/google';

const TestForm = () => {
    const clientId = "1022754851250-dem1d9h59r7id6ga8e8ukpa2668fmf15.apps.googleusercontent.com";
    const scope = 'email';
    const redirectUri = 'http://localhost:8080/user/login-google';
    const responseType = 'code';
    const approvalPrompt = 'force';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}&client_id=${clientId}&approval_prompt=${approvalPrompt}`;

    const onSuccess = (res) => {
        console.log("Login success, current user: ", res.profileObj)
    }
    const onFailure = (res) => {
        console.log("Failure, res: ", res)
    }
    const [formData, setFormData] = React.useState({
        image_data: null,  // Thay đổi thành kiểu dữ liệu phù hợp với việc tải hình ảnh
        image_name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image_data: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = 'http://localhost:8080/movie/save-image';

        const formDataToSend = new FormData();
        formDataToSend.append('image_data', formData.image_data);
        formDataToSend.append('image_name', formData.image_name);

        try {
            const response = await axios.post(endpoint, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server response:', response.data);
            console.log('Img src:', response.data.image_data);
            setSrc(response.data.image_data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const [srcImg, setSrc] = useState("");


    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>


            <div className="hero common-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1> blog listing - list</h1>
                                <ul className="breadcumb">
                                    <li className="active"><a href="#">Home</a></li>
                                    <li> <span className="ion-ios-arrow-right"></span> blog listing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
            {/* <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}

                onError={() => {
                    console.log('Login Failed');
                }}

            /> */}
            <a href={googleAuthUrl}>login with google</a>
            <img src={"data:image/png;base64," + srcImg} alt="" />
            <form onSubmit={handleSubmit}>
                <label>
                    Image Name:
                    <input type="text" name="image_name" value={formData.image_name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Image File:
                    <input type="file" name="image_data" onChange={handleImageChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>


        </>
    )


}
export default TestForm;