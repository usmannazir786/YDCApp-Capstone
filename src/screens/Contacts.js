import React, { useCallback, useState, useEffect, Fragment} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../Firebase/firebaseConfig';