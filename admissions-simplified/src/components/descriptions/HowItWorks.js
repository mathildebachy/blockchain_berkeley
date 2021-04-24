import React from 'react';
import './../Home.css';
import digital_icon from './../../assets/digital_icon.png'
import {Link} from "react-router-dom";

class OurValues extends React.Component {
    render() {
      return (
        <div className="home">
          <div>
            <h1>How It Works</h1>
            <p className="text">At <strong>Admissions Simplified</strong>, students follow an easy process to request their records by providing key identifying information through our secure online portal. As a Software-as-a-Solution (SaaS) service, we aim to provide competitive pricing to everyone involved in the college admissions process, with our platform being scalable throughout the United States.</p>
            <p className="text">After students input their information on our portal, Admissions Simplified uses <em>smart contracts</em> to securely certify degrees and transcripts. Blockchain provides <strong>trust verification</strong> through <em>encryption</em> and a <em>distributed consensus</em> providing tamper-proof evidence. The student’s request for verification will be validated only through the high school/institution of learning, with its access being secure through its public key.</p>
            <h1>Our Business Model</h1>
            <p className="text">Our business model is centered around our <Link to='/our-values'>Core Values</Link> of distributing <strong>TREATS</strong> to all. Through this framework, we have a model aimed at generating revenues primarily from colleges and universities, with their associations with us lowering the costs for our consumers. We aim to provide the lowest costs possible for students and education institutions at the high school level, removing just some of the burden from the stressful college admissions process.</p>
            <h1>Pricing</h1>
            <p className="text"><strong>Admissions Simplified</strong> charges each student a low fee per transcript verification sent to each university. These fees will be shown while the student is selecting colleges/universities to apply to, and again before the student confirms their payment method. Please <Link to='/contact-us'>Contact Us</Link> for more information about our current pricing model.</p>
          </div>

          <div class="home_buttons">
            <Link to='/student-request'>
              <button class="home_button">
                  <p>Get Started Now</p>
              </button>
            </Link>
            <Link to='/meet-the-team' className='text-link'>
              <button class="home_button">
                <p>Meet the team</p>
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
  
  export default OurValues;