import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WordInput from "../components/WordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useCallback, useEffect, useRef, useState } from "react";
import WordOutput from "../components/WordOutput";
import Keyboard from "../components/Keyboard";

import {
  InterstitialAd,
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
  RewardedInterstitialAd,
} from "react-native-google-mobile-ads";

export default function GameScreen({
  setIsGameOver,
  wordToGuess,
  guessWords,
  setGuessWords,
  words,
}) {
  const [loaded, setLoaded] = useState(false);

  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : Platform.OS === "ios"
    ? "ca-app-pub-4795904642663569/3798689291"
    : "ca-app-pub-4795904642663569/4308127667";

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const [newWord, setNewWord] = useState("");

  const [loadedInterstitial, setLoadedInterstitial] = useState(false);

  const flatList = useRef(null);

  const isWord = (newWord) => {
    if (newWord.trim().length < 5) {
      return;
    }

    if (
      words.indexOf(newWord.trim().toLowerCase()) >= 0 &&
      newWord.trim().length === 5
    ) {
      return true;
    }
    return false;
  };

  const addWord = (newWord) => {
    if (newWord.trim().length < 5) {
      return;
    }

    setGuessWords((previousWords) => [
      ...previousWords,
      {
        word: newWord,
        status: newWord === wordToGuess ? "Correct" : "Incorrect",
      },
    ]);

    if (newWord.trim() === wordToGuess) {
      setIsGameOver(true);
    }

    setNewWord("");
  };

  const adUnitIdBanner = __DEV__
    ? TestIds.BANNER
    : Platform.OS === "ios"
    ? "ca-app-pub-4795904642663569/5656024778"
    : "ca-app-pub-4795904642663569/5656024778";

  const adUnitIdInterstitial = __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.OS === "ios"
    ? ""
    : "";

  const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  const loadRewardedAd = () => {
    alert("loadRewardedAd");
    rewarded.removeAllListeners();
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const loadInterstitial = () => {
    interstitial.removeAllListeners();
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoadedInterstitial(true);
      }
    );
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoadedInterstitial(false);
        interstitial.load();
      }
    );
    interstitial.load();
    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };
  function setCharAt(str, letterPosition, chr) {
    let newValue = str;
    if (letterPosition > str.length - 1) return str;

    if (letterPosition === 0) {
      return chr + str.substring(letterPosition + 1);
    } else if (letterPosition + 1 === str.length) {
      return str.substring(0, letterPosition) + chr;
    } else {
      return (
        str.substring(0, letterPosition) +
        chr +
        str.substring(letterPosition + 1)
      );
    }
  }

  const onChangeInput = (word, letterPosition, letter) => {
    let newValue = setCharAt(word, letterPosition, letter);
    setNewWord(newValue);
  };

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const callBackLoadRewardedAd = useCallback(() => {
    alert(loaded);
    setTimeout(() => {
      loaded !== true && loadRewardedAd();
    }, 5000);
  }, [loaded]);

  // Temporary remove Interstitial
  useEffect(() => {
    callBackLoadInterstitial();
  }, [loadedInterstitial]);

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    return unsubscribeInterstitialEvents;
  }, []);

  const callBackLoadInterstitial = useCallback(() => {
    setTimeout(() => {
      loadedInterstitial !== true && loadInterstitial();
    }, 5000);
  }, [loadedInterstitial]);

  const showInterstitial = () => {
    try {
      interstitial.show();
    } catch (error) {
      return loadInterstitial();
    }
  };

  const showAd = () => {
    alert(loaded);
    if (loaded) {
      try {
        rewarded.show();
        setLoaded(false);
      } catch {
        setLoaded(false);
        loadRewardedAd();
      }
    } else {
      loadRewardedAd();
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.wordsContainer}>
        <FlatList
          ref={flatList}
          onContentSizeChange={() => {
            flatList.current.scrollToEnd();
          }}
          data={guessWords}
          renderItem={(itemData) => {
            return (
              <WordOutput word={itemData.item} wordToGuess={wordToGuess} />
            );
          }}
        />
      </View>
      <Button
        onPress={() => {
          showAd();
        }}
        title="ad"
      ></Button>
      <View style={styles.inputContainer}>
        <WordInput newWord={newWord} onChangeInput={onChangeInput} />
      </View>

      <View style={styles.keyboardContainer}>
        <Keyboard setNewWord={setNewWord} newWord={newWord}></Keyboard>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          param={newWord}
          onHandlePress={addWord}
          enable={
            newWord.length === 5 &&
            words.indexOf(newWord.trim().toLowerCase()) >= 0
              ? true
              : false
          }
        >
          {isWord(newWord) === false
            ? "Not A Word"
            : isWord(newWord) === true
            ? "SUBMIT"
            : "press more key(s)"}
        </PrimaryButton>
      </View>
      <BannerAd
        unitId={adUnitIdBanner}
        size={BannerAdSize.BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      ></BannerAd>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingVertical: 50,
    paddingTop: 100,
    paddingHorizontal: 16,

    // width: "100%",
  },
  wordsContainer: {
    flex: 1.5,
    alignItems: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 40,
  },
  inputContainer: {
    flex: 0.25,
    justifyContent: "center",

    alignItems: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 16,
  },

  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    // borderWidth: 1,
    marginBottom: 16,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 50,
    borderColor: "gray",
    // borderWidth: 1,
  },
});
