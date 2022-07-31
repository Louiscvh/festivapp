import Container from '../components/Container';
import { getLayout } from '../layouts/MenuLayout';
import styled from 'styled-components';
import Button from '../components/Button';
import { globalColors } from './_app';
import { prisma, PrismaClient } from '@prisma/client';

const StyledPage = styled.div`

form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    & > input, & > select{
        all: unset;
        background-color: ${globalColors.white};
        border-radius: 8px;
        padding: 1rem;
    }
}
`
export default function New({festivals}) {
  return (
    <StyledPage>
        <Container>
            <main>
                <section>
                    <h1>Ajouter un post</h1>
                    <form>
                        <input required type="file" accept="image/*" capture></input>
                        <select required>
                            {festivals.map((festival, i) => (
                                <option key={i} value={festival.id}>{festival.name}</option>
                            ))}
                        </select>
                        <input required type="texte" placeholder='Ajouter un lieu'></input>
                        <h3>Voulez-vous cacher le nombre de like sur votre post ?</h3>
                        <div>
                           <input type="radio" name="yes_no" id="" /> Oui
                           <input checked type="radio" name="yes_no" id="" /> Non
                        </div>
                        <Button submit>
                            Poster
                        </Button>
                    </form>
                </section>
            </main>
        </Container>
    </StyledPage>
  )
}

export async function getServerSideProps() {
    const prisma = new PrismaClient()

    const request = await prisma.festival.findMany()
    const festivals = JSON.parse(JSON.stringify(request))
    return {
      props : { festivals }
    }
  }

New.getLayout = getLayout;
