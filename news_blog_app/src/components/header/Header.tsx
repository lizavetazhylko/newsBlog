import React from 'react';
import { Button } from 'react-bootstrap';

const Header = (props: any) => {
    const { currentUser, children } = props;
    const handleLogOut = () => {
        localStorage.removeItem('jwtAccess');
        localStorage.removeItem('jwtRefresh');
        window.location.href = '/signin';
    }
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: 40,
            backgroundColor: 'darkblue',
            justifyContent: 'space-between'
        }}>
            <div>
                {children}
            </div>
            {currentUser &&
                <div style={{color: 'white', marginRight: 15, display: 'flex', textAlign: 'center'}}>
                    <div>
                        <h4>{currentUser.username}</h4>
                    </div>
                    <Button onClick={handleLogOut} style={{marginLeft: 10 }}>
                        Log out
                    </Button>
                </div>
            }
        </div>
    )
}

export { Header };