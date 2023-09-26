import React from "react";
import "./Footer.scss";

import Twitter_pic from "../../Imagestemp/twitter.png"
import Linkedin_pic from "../../Imagestemp/linkedin.png"
import Instagram_pic from "../../Imagestemp/instagram.png"
import Facebook_pic from "../../Imagestemp/facebook.png"
import Pinterest_pic from "../../Imagestemp/pinterest.png"
import Language_pic from "../../Imagestemp/language.png"
import Accessibility_pic from "../../Imagestemp/accessibility.png"
import Coin_pic from "../../Imagestemp/coin.png"



function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>Sitemap</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on Liverr</span>
            <span>Buying on Liverr</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From Fiverr</h2>
            <span>Liverr Business</span>
            <span>Liverr Pro</span>
            <span>Liverr Logo Maker</span>
            <span>Liverr Guides</span>
            <span>Get Inspired</span>
            <span>Liverr Select</span>
            <span>ClearVoice</span>
            <span>Liverr Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>liverr</h2>
            <span>© Liverr International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src={Twitter_pic} alt="" />
              <img src={Facebook_pic} alt="" />
              <img src={Linkedin_pic} alt="" />
              <img src={Pinterest_pic} alt="" />
              <img src={Instagram_pic} alt="" />
            </div>
            <div className="link">
              <img src={Language_pic} alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src={Coin_pic} alt="" />
              <span>USD</span>
            </div>
            <img src={Accessibility_pic} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;