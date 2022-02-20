import { Accordion, Container, Row } from 'react-bootstrap';
import Footer from '../footer/footer';

import './aside-menu.style.scss';

const AsideMenu = () => {
  return (
    <div className="aside-menu">
      <div className="aside-menu-accordion">
        <Container>
          <Row>
            {/* STAFF */}
            <Accordion>
              <Accordion.Item eventKey={0}>
                <Accordion.Header>KADRY</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey={1}>
                      <Accordion.Header>Dane osobowe</Accordion.Header>
                      <Accordion.Body>
                        <a href="/personaldata/form" className="href">Dodaj</a><br />
                        <a href="/personaldata" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={2}>
                      <Accordion.Header>Pracownicy</Accordion.Header>
                      <Accordion.Body>
                        <a href="/employees/form" className="href">Dodaj</a><br />
                        <a href="/employees" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={3}>
                      <Accordion.Header>Szkolenia</Accordion.Header>
                      <Accordion.Body>
                        <a href="/trainings/form" className="href">Dodaj</a><br />
                        <a href="/trainings" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={4}>
                      <Accordion.Header>Ubezpieczenia</Accordion.Header>
                      <Accordion.Body>
                        <a href="/insurances/form" className="href">Dodaj</a><br />
                        <a href="/insurances" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={5}>
                      <Accordion.Header>Umowy</Accordion.Header>
                      <Accordion.Body>
                        <a href="/contracts/form" className="href">Dodaj</a><br />
                        <a href="/contracts" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={6}>
                      <Accordion.Header>Urlopy</Accordion.Header>
                      <Accordion.Body>
                        <a href="/holidays/form" className="href">Dodaj</a><br />
                        <a href="/holidays" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={7}>
                      <Accordion.Header>Wynagrodzenia</Accordion.Header>
                      <Accordion.Body>
                        <a href="/salaries/form" className="href">Dodaj</a><br />
                        <a href="/salaries" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row>
            {/* PRODUCTION */}
            <Accordion>
              <Accordion.Item eventKey={8}>
                <Accordion.Header>PRODUKCJA</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey={9}>
                      <Accordion.Header>Zmiany</Accordion.Header>
                      <Accordion.Body>
                        <a href="/shifts/form" className="href">Dodaj</a><br />
                        <a href="/shifts" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={10}>
                      <Accordion.Header>Zlecenia</Accordion.Header>
                      <Accordion.Body>
                        <a href="/orders/form" className="href">Dodaj</a><br />
                        <a href="/orders" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={11}>
                      <Accordion.Header>Przepustki</Accordion.Header>
                      <Accordion.Body>
                        <a href="/permits/form" className="href">Dodaj</a><br />
                        <a href="/permits" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row>
            {/* SERVICE */}
            <Accordion>
              <Accordion.Item eventKey={0}>
                <Accordion.Header>UTRZYMANIE</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey={12}>
                      <Accordion.Header>Maszyny</Accordion.Header>
                      <Accordion.Body>
                        <a href="/machines/form" className="href">Dodaj</a><br />
                        <a href="/machines" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={13}>
                      <Accordion.Header>Raporty</Accordion.Header>
                      <Accordion.Body>
                        <a href="/raports/form" className="href">Dodaj</a><br />
                        <a href="/raports" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row>
            {/* WAREHOUSE */}
            <Accordion>
              <Accordion.Item eventKey={0}>
                <Accordion.Header>MAGAZYN</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey={12}>
                      <Accordion.Header>Produkty</Accordion.Header>
                      <Accordion.Body>
                        <a href="/products/form" className="href">Dodaj</a><br />
                        <a href="/products" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion>
                    <Accordion.Item eventKey={13}>
                      <Accordion.Header>Wysyłki</Accordion.Header>
                      <Accordion.Body>
                        <a href="/shippings/form" className="href">Dodaj</a><br />
                        <a href="/shippings" className="href">Przeglądaj</a>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default AsideMenu;