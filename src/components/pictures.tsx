import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { picturesSelector, getSelectedPicture } from '../reducer';
import { selectPicture, closeModal } from '../actions';
import ModalPortal from './modal';
import { Picture } from '../types/picture.type';
import { Option, isSome } from 'fp-ts/Option';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const selectedPicture: Option<Picture> = useSelector(getSelectedPicture);

  return (
    <>
      <Container>
        {pictures.map((picture, index) => (
          <Image 
            key={index} 
            src={picture.previewFormat} 
            alt={picture.author} 
            onClick={() => dispatch(selectPicture(picture))}
          />
        ))}
      </Container>
      {isSome(selectedPicture) && (
        <ModalPortal 
          largeFormat={selectedPicture.value.largeFormat} 
          close={() => dispatch(closeModal())} 
        />
      )}
    </>
  );
};

export default Pictures;
