import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AestheticDetail } from './types';

interface AestheticDetailsProps {
  aesthetic: AestheticDetail;
}

const Container = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary.slateBlue};
  }
`;

const ColorPalette = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
`;

export const AestheticDetails = ({ aesthetic }: AestheticDetailsProps) => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Header>
        <ImageContainer>
          <Image src={aesthetic.imageUrl} alt={aesthetic.name} />
        </ImageContainer>
        <TitleSection>
          <Title>{aesthetic.name}</Title>
          <Description>{aesthetic.description}</Description>
        </TitleSection>
      </Header>

      <Grid>
        <Section>
          <SectionTitle>Fashion</SectionTitle>
          <List>
            <ListItem>Clothing: {aesthetic.fashion.clothing.join(', ')}</ListItem>
            <ListItem>Accessories: {aesthetic.fashion.accessories.join(', ')}</ListItem>
            <ListItem>Brands: {aesthetic.fashion.brands.join(', ')}</ListItem>
            <ListItem>Styles: {aesthetic.fashion.styles.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Music</SectionTitle>
          <List>
            <ListItem>Genres: {aesthetic.music.genres.join(', ')}</ListItem>
            <ListItem>Artists: {aesthetic.music.artists.join(', ')}</ListItem>
            <ListItem>Songs: {aesthetic.music.songs.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Decor</SectionTitle>
          <List>
            <ListItem>Elements: {aesthetic.decor.elements.join(', ')}</ListItem>
            <ListItem>Colors: {aesthetic.decor.colors.join(', ')}</ListItem>
            <ListItem>Materials: {aesthetic.decor.materials.join(', ')}</ListItem>
            <ListItem>Patterns: {aesthetic.decor.patterns.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Vibe</SectionTitle>
          <List>
            <ListItem>Keywords: {aesthetic.vibe.keywords.join(', ')}</ListItem>
            <ListItem>Feelings: {aesthetic.vibe.feelings.join(', ')}</ListItem>
            <ListItem>Activities: {aesthetic.vibe.activities.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Places</SectionTitle>
          <List>
            <ListItem>Locations: {aesthetic.places.locations.join(', ')}</ListItem>
            <ListItem>Venues: {aesthetic.places.venues.join(', ')}</ListItem>
            <ListItem>Cities: {aesthetic.places.cities.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>People</SectionTitle>
          <List>
            <ListItem>Influencers: {aesthetic.people.influencers.join(', ')}</ListItem>
            <ListItem>Celebrities: {aesthetic.people.celebrities.join(', ')}</ListItem>
            <ListItem>Characters: {aesthetic.people.characters.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Artists</SectionTitle>
          <List>
            <ListItem>Visual: {aesthetic.artists.visual.join(', ')}</ListItem>
            <ListItem>Musicians: {aesthetic.artists.musicians.join(', ')}</ListItem>
            <ListItem>Designers: {aesthetic.artists.designers.join(', ')}</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Sayings</SectionTitle>
          <List>
            {aesthetic.sayings.map((saying, index) => (
              <ListItem key={index}>{saying}</ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <SectionTitle>Color Palette</SectionTitle>
          <ColorPalette>
            {aesthetic.colorPalette.map((color, index) => (
              <ColorSwatch key={index} $color={color} />
            ))}
          </ColorPalette>
        </Section>
      </Grid>
    </Container>
  );
}; 