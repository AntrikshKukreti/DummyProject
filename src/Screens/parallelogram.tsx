import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Parallelogram = () => {
  const Triangleleft = () => {
    return <View style={[styles.triangle, styles.parallelogramLeft]} />;
  };

  const TriangleRight = () => {
    return (
      <View
        style={[
          styles.triangle,
          styles.triangleDown,
          styles.parallelogramRight,
        ]}
      />
    );
  };

  return (
    <View style={styles.parallelogram}>
      <Triangleleft />
      <View style={styles.parallelogramInner}>
        <Text style={{color: '#fff'}}>ANKU</Text>
      </View>
      <TriangleRight />
    </View>
  );
};

const BigParallelogram = () => {
  const Triangleleft = () => {
    return <View style={[styles.bigtriangle, styles.bigparallelogramLeft]} />;
  };

  const TriangleRight = () => {
    return (
      <View
        style={[
          styles.bigtriangle,
          styles.triangleDown,
          styles.bigparallelogramRight,
        ]}
      />
    );
  };

  return (
    <View style={styles.bigparallelogram}>
      <Triangleleft />
      <View style={styles.bigparallelogramInner} />
      <TriangleRight />
    </View>
  );
};

const MainParallelogram = () => {
  return (
    <View style={{position: 'relative', marginVertical: 10}}>
      <Parallelogram />
      <BigParallelogram />
    </View>
  );
};

const styles = StyleSheet.create({
  parallelogram: {
    width: 150,
    height: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: 5,
    zIndex: 1,
  },
  parallelogramInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#000',
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parallelogramRight: {
    top: 0,
    right: -50,
    position: 'absolute',
  },
  parallelogramLeft: {
    top: 0,
    left: -50,
    position: 'absolute',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
  },
  triangleDown: {
    transform: [{rotate: '180deg'}],
  },

  bigparallelogram: {
    width: 155,
    height: 110,
    alignSelf: 'center',
  },
  bigparallelogramInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'orange',
    width: 155,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigparallelogramRight: {
    top: 0,
    right: -55,
    position: 'absolute',
  },
  bigparallelogramLeft: {
    top: 0,
    left: -55,
    position: 'absolute',
  },
  bigtriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 55,
    borderRightWidth: 55,
    borderBottomWidth: 110,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'orange',
  },
});

export {MainParallelogram};
