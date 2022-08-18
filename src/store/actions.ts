import React from 'react';
import { ethers } from 'ethers';
import { getNetwork } from '../constants';

export const SET_NETWORK = 'SET_NETWORK';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_PROVIDER = 'SET_PROVIDER';

export const setNetwork = (dispatch: React.Dispatch<any>, payload: any) => {
  dispatch({ type: SET_NETWORK, payload });

  const localProviderUrl = getNetwork(payload).rpcUrl;
  const provider = new ethers.providers.JsonRpcProvider(localProviderUrl);
  dispatch({ type: SET_PROVIDER, payload: provider });
};

export const setAccount = (dispatch: React.Dispatch<any>, payload: any) => {
  dispatch({ type: SET_ACCOUNT, payload });
};
