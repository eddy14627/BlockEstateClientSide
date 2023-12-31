import React from "react";
import Link from "next/link";
const AuthorTwo = ({ address, author }) => {
  console.log(author);
  return (
    <div class="rn-author-area mb--30 mt_dec--120">
      <div class="container">
        <div class="row padding-tb-50 align-items-center d-flex">
          <div class="col-lg-12">
            <div class="author-wrapper">
              <div class="author-inner">
                <div class="user-thumbnail">
                  <img src="/profile/profile-01.jpg" alt="" />
                </div>
                <div class="rn-author-info-content">
                  <h4 class="title">{address?.slice(0, 20)}...</h4>
                  <Link href="#" class="social-follw">
                    <i data-feather="twitter"></i>
                    <span class="user-name">its Obsession</span>
                  </Link>
                  <div class="follow-area">
                    {/* <div class="follow followers">
                      <span>
                        186k{" "}
                        <Link href="#" class="color-body">
                          followers
                        </Link>
                      </span>
                    </div>
                    <div class="follow following">
                      <span>
                        {author.length} <Link href="#">Owned Property</Link>
                      </span>
                    </div> */}
                  </div>
                  {/* <div class="author-button-area">
                    <span class="btn at-follw follow-button">Follow</span>
                    <div class="count at-follw">
                      <div class="share-btn share-btn-activation dropdown">
                        <button
                          class="icon"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <svg
                            viewBox="0 0 14 4"
                            fill="none"
                            width="16"
                            height="16"
                            class="sc-bdnxRM sc-hKFxyN hOiKLt"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>

                        <div class="share-btn-setting dropdown-menu dropdown-menu-end">
                          <button
                            type="button"
                            class="btn-setting-text report-text"
                            data-bs-toggle="modal"
                            data-bs-target="#reportModal"
                          >
                            Report
                          </button>
                          <button
                            type="button"
                            class="btn-setting-text report-text"
                          >
                            Claim Owenership
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTwo;
