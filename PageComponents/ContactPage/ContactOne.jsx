import React from "react";
import Link from "next/link";
const ContactOne = () => {
  return (
    <div class="rn-breadcrumb-inner ptb--30">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-12">
            <h5 class="title text-center text-md-start">Contact With Us</h5>
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <ul class="breadcrumb-list">
              <li class="item">
                <Link href="index.html">Home</Link>
              </li>
              <li class="separator">
                <i class="feather-chevron-right"></i>
              </li>
              <li class="item current">Contact With Us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactOne;
