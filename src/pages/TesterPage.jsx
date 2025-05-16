import React, { useState, useEffect } from 'react'
import axios from 'axios'


const TesterPage = () => {

    return (
        // first put an update button that will provide the plan
        // Add a save button that will PUT the request.
        <div className='pl-8 pt-6 bg-black min-h-screen text-white font-mono'>
            <div className=''>
            
            <p>Updating Logs ...</p>
            <p>Update Complete ............................  100%</p>
            <p>Pending Executions ..........................  26</p>
            <p>Calculations complete ......................  100%</p>
            <p>Missing Files ................................. 2</p>
            <p>Ignore Reminders ...</p>
            <p>Upgrading System...</p>
            <p>Downloading https://formulae.life.sh/api/life/formula.jws.json</p>
            <p>Removing: /Users/tawsifr/Library/Logs/life/dependencies... (64B)</p>
            <p>Removing: /Users/tawsifr/Library/Logs/life/logs...... (64B)</p>
            <p>Removing: /Users/tawsifr/Library/Logs/life/memory...... (64B)</p>
            <p>Removing: /Users/tawsifr/Library/Logs/life/desires...... (64B)</p>
            <p>Removing: /Users/tawsifr/Library/Logs/life/Longings...... (64B)</p>
            <p>Upgrade Complete...</p>
            <br/>
            <p>------------------------------------------------------------------------------------- WELCOME TAWSIF -----------------------------------------------------------------------------------------</p>
            <br/>
            <p>&gt;&gt; ls</p>
            <p>README.md</p>
            <p>&gt;&gt; nano README.md</p>
            <p>Permission Denied</p>
            <p>&gt;&gt; sudo nano README.md</p>
            <p>Password: *******</p>
            <p>loading file contents...</p>
            <br/>
            <p>------------------------------------------------------------------------------- UW PICO 5.09,File: README.md ---------------------------------------------------------------------------------</p>                           

            <p>
            Sahl ibn Sa’d reported:<br/> The Angel Gabriel came to the Prophet, peace and blessings be upon him, and he said,<br/> “O Muhammad, live as you wish, for you will surely die.<br/> Work as you wish, for you will surely be repaid. <br/>Love whomever you wish, for you will surely be separated.<br/>Know that the nobility of the believer is in prayer at night, <br/>and his honor is in his independence of people.”<br/>
            --------------- Source: al-Muʻjam al-Awsaṭ lil-Ṭabarānī 4278
            </p>
            <br/>
            <br/>
            <div className='border-2'>
            <p className='font-bold'>^G Get Help  ^O WriteOut  ^R Read File ^Y Prev Pg   ^K Cut Text  ^C Cur Pos  </p> 
            <p className='font-bold'>  ^X Exit      ^J Justify   ^W Where is  ^V Next Pg   ^U UnCut Text^T To Spell</p>
            </div>
            

                
            

            </div>

        </div>

    )
}

export default TesterPage