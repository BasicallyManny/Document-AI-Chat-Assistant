// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Container, Col } from 'react-bootstrap';

export default function Home() {
    return (
        <Container>
            <section id="homeComponent">
                <>Home Page</>
            </section>
            <section>
                <>About Component</>
            </section>
            <section id="routeMessageBoard">
                <>Try App</>
            </section>
        </Container>
    );
}