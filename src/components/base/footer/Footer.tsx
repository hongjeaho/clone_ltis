import styled from '@emotion/styled/macro'
import { format } from 'date-fns'

const Footer = styled.footer`
  margin: 40px 0;
  background-color: #dbdfea;
`

const Footter: React.FC = () => {
  return (
    <Footer>
      &copy; {format(new Date(), 'yyyy.MM.dd')}
      <footer id="footer">
        <h2 className="blind">FOOTER</h2>
        <div className="wrap center">
          <div className="f_site">
            <button type="button" className="fs_btn">
              추천바로바로처리센터
            </button>
            <div className="fs_list">
              <ul>
                <li>
                  <a href="https://www.seoul.go.kr/main/index.jsp" target="_blank" rel="noreferrer">
                    서울특별시
                  </a>
                </li>
                <li>
                  <a href="http://oclt.molit.go.kr/intro.do" target="_blank" rel="noreferrer">
                    중앙토지수용위원회
                  </a>
                </li>
                <li>
                  <a href="https://land.seoul.go.kr:444/land" target="_blank" rel="noreferrer">
                    부동산정보광장
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.scourt.go.kr/scourt/index.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    대법원
                  </a>
                </li>
                <li>
                  <a href="https://www.kapanet.or.kr" target="_blank" rel="noreferrer">
                    한국감정평가사협회
                  </a>
                </li>
                <li>
                  <a href="https://kreri.re.kr" target="_blank" rel="noreferrer">
                    한국부동산연구원
                  </a>
                </li>
                <li>
                  <a
                    href="https://molit.kapanet.or.kr/system/main.do"
                    target="_blank"
                    rel="noreferrer"
                  >
                    재결감정평가서정보센터
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="f_logo">
            <h3 className="blind">한국감정평가사협회</h3>
          </div>

          <div className="f_info">
            <h3 className="blind">정보</h3>

            <p className="fi_copyright mb10">
              <a href="/main/policy" className="mr10">
                개인정보처리방침{' '}
              </a>
              <span>|</span>
              <a href="/main/call" className="pl10">
                콜센터
              </a>
            </p>

            <ul>
              <li>
                <span>
                  {' '}
                  서울특별시 중구 서소문로 124 (서소문동) 씨티스퀘어빌딩 11층 토지관리과{' '}
                </span>
              </li>
              <li>
                <span>
                  {' '}
                  HELP DESK : 02-3465-9975 [월~금 10:00~17:00, 점심시간(12:00~13:00) 및 공휴일 제외]
                </span>
              </li>
              <li>
                <span> Email : helpdesk@sltis.info</span>
              </li>
            </ul>
            <p className="fi_copyright">Copyright © 2018 land.seoul.go.kr. All right reserved.</p>
          </div>
        </div>
      </footer>
    </Footer>
  )
}

export default Footter
