import React from 'react'

export const Login = () => {
    return (
        <div className="d-flex justify-content-center" style={{marginTop:'150px'}}>
            <div className="user_card">
                <div className="d-flex justify-content-center">
                    <div className="brand_logo_container">
                        <img src="login_logo.png" className="brand_logo" alt="Logo" />
                    </div>
                </div>
                <div className="d-flex justify-content-center form_container">
                    <form>
                        <div className="input-group mb-3">
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-user" /></span>
                            </div>
                            <input type="text" name className="form-control input_user" defaultValue placeholder="username" />
                        </div>
                        <div className="input-group mb-2">
                            <div className="input-group-append">
                                <span className="input-group-text"><i className="fas fa-key" /></span>
                            </div>
                            <input type="password" name className="form-control input_pass" defaultValue placeholder="password" />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customControlInline" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button type="button" name="button" className="btn login_btn">Login</button>
                        </div>
                    </form>
                </div>
                <div className="mt-4">
                    <div className="d-flex justify-content-center links">
                        Don't have an account? <a href="#" className="ml-2">Sign Up</a>
                    </div>
                    <div className="d-flex justify-content-center links">
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;