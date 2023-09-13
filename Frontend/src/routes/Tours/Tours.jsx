import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ToursTable from '../../components/Tours/ToursTable';

function Tours() {
    return (
        <Sidebar>
            <div>
                <ToursTable />
            </div>
        </Sidebar>
    );
}

export default Tours;
