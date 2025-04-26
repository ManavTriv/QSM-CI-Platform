const algorithmInfo = {
  "LAPLACIAN VSHARP RTS": {
    description:
      "Performs Laplacian phase unwrapping followed by V-SHARP background field removal and RTS inversion. Known for strong baseline performance.",
    tags: ["Laplacian", "VSHARP", "RTS", "Baseline"],
  },
  "LAPLACIAN PDF RTS": {
    description:
      "Uses Laplacian unwrapping and PDF background removal, followed by RTS for inversion. Good trade-off between speed and accuracy.",
    tags: ["Laplacian", "PDF", "RTS"],
  },
  "LAPLACIAN NEXTQSM": {
    description:
      "Applies Laplacian unwrapping and NextQSM for inversion, aiming for better noise robustness.",
    tags: ["Laplacian", "NextQSM"],
  },
  "ROMEO NEXTQSM": {
    description:
      "ROMEO phase unwrapping combined with NextQSM inversion. Offers improved phase quality before inversion.",
    tags: ["ROMEO", "NextQSM"],
  },
  "ROMEO PDF RTS": {
    description:
      "ROMEO-based unwrapping, PDF for background removal, and RTS inversion. Balances phase quality and reconstruction fidelity.",
    tags: ["ROMEO", "PDF", "RTS"],
  },
  "ROMEO PDF TV": {
    description:
      "Combines ROMEO unwrapping, PDF removal, and TV-regularized inversion for enhanced sharpness.",
    tags: ["ROMEO", "PDF", "TV"],
  },
  "ROMEO VSHARP RTS": {
    description:
      "ROMEO phase unwrapping with V-SHARP background removal and RTS inversion. Good visual consistency.",
    tags: ["ROMEO", "VSHARP", "RTS"],
  },
  TGV: {
    description:
      "Applies Total Generalized Variation (TGV) regularization for robust inversion and smooth reconstructions.",
    tags: ["TGV", "Smooth", "Robust"],
  },
};

export default algorithmInfo;
