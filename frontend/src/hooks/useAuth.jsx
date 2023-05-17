import React from 'react';

import AuthContext from '../context/AuthProvider';

export default async function useAuth() {
    return React.useContext(AuthContext)
}